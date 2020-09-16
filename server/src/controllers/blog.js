import { asyncHandler, deleteImage } from '../middlewares';
import BlogModel from '../models/Blog';
import Response from '../utils';

export const getAll = asyncHandler(async (req, res) => {
  const blogs = await BlogModel.find();
  Response.success(
    res,
    200,
    { count: blogs.length, blogs },
    'Successfully retrieved'
  );
});

export const getOne = asyncHandler(async (req, res) => {
  const { blogId } = req.params;
  if (!blogId)
    return Response.error(res, 400, 'Please provide an id for the blog!');

  const blog = await BlogModel.findById(blogId);

  return Response.success(res, 200, blog);
});

export const create = asyncHandler(async (req, res) => {
  const { title, author, body } = req.body;
  const { image, imageId } = req;
  if (!title || !author || !body || !image)
    return Response.error(res, 400, 'Please provide all blog info!');

  const blog = await BlogModel.create({ title, author, body, image, imageId });

  return Response.success(res, 201, blog, 'Blog Created successfully');
});

export const update = asyncHandler(async (req, res) => {
  const { blogId } = req.params;

  const blog = await BlogModel.findOneAndUpdate(
    { _id: blogId },
    { ...req.body },
    { new: true, runValidators: true }
  );

  return Response.success(res, 200, blog, 'Blog Updated successfully');
});

export const deleteOne = asyncHandler(async (req, res) => {
  const { blogId } = req.params;

  const blog = await BlogModel.findOne({ _id: blogId });

  if (blog.imageId) await deleteImage(res, blog.imageId);
  await blog.deleteOne();

  return Response.success(res, 204, blog, 'Blog deleted successfully');
});
