import { blogValidate, commentValidate, validate } from '../validation';
import { asyncHandler, deleteImage } from '../middlewares';
import CommentModel from '../models/Comment';
import BlogModel from '../models/Blog';
import Response from '../utils';

export const getAll = asyncHandler(async (req, res) => {
  const blogs = await BlogModel.find();
  if (!blogs) return Response.error(res, 404, 'No blog was found!');

  return Response.success(
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

  const { _doc: blog } = await BlogModel.findById(blogId)
    .populate('comments')
    .populate('author');
  if (!blog) return Response.error(res, 404, 'Blog not found!');

  return Response.success(res, 200, {
    ...blog,
    author: {
      ...blog.author._doc,
      password: undefined,
      email: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      __v: undefined,
    },
  });
});

export const create = asyncHandler(async (req, res) => {
  const {
    image,
    imageId,
    user: { userId: author },
  } = req;
  const post = { ...req.body, image, imageId, author };

  const { details: errors } = validate(blogValidate.CreateSchema, post);
  if (errors) return Response.error(res, 400, errors[0].message, errors[0]);

  const { _doc: blog } = await BlogModel.create(post);
  if (!blog) return Response.error(res, 404, 'Blog not created!');

  return Response.success(res, 201, blog, 'Blog Created successfully');
});

export const update = asyncHandler(async (req, res) => {
  const { blogId } = req.params;

  const { details: errors } = validate(blogValidate.UpdateSchema, req.body);
  if (errors) return Response.error(res, 400, errors[0].message, errors[0]);

  const blog = await BlogModel.findOneAndUpdate({ _id: blogId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!blog) return Response.error(res, 404, 'Blog not found!');

  return Response.success(res, 200, blog, 'Blog Updated successfully');
});

export const deleteOne = asyncHandler(async (req, res) => {
  const { blogId } = req.params;

  const blog = await BlogModel.findOne({ _id: blogId });
  if (!blog) return Response.error(res, 404, 'Blog not found!');

  if (blog.imageId) await deleteImage(res, blog.imageId);
  await blog.comments.forEach(async (comment) => {
    await CommentModel.findByIdAndDelete(comment);
  });
  await blog.deleteOne();

  return Response.success(res, 200, blog, 'Blog deleted successfully');
});

export const like = asyncHandler(async (req, res) => {
  const { blogId } = req.params;
  const {
    user: { userId },
  } = req;
  if (!blogId)
    return Response.error(res, 400, 'Please provide an id for the blog!');

  const blog = await BlogModel.findById(blogId);
  if (!blog) return Response.error(res, 404, 'Blog not found!');

  if (!blog.likers.includes(userId)) {
    blog.likers.push(userId);
    blog.likes += 1;
  } else {
    blog.likers = blog.likers.filter((liker) => String(liker) !== userId);
    blog.likes -= 1;
  }

  await blog.save();

  return Response.success(res, 200, blog, 'Successfully Liked post');
});

export const addComment = asyncHandler(async (req, res) => {
  const { blogId } = req.params;
  const {
    user: { userId },
  } = req;

  if (!blogId)
    return Response.error(res, 400, 'Please provide an id for the blog!');

  const comment = { ...req.body, author: userId };

  const { details: errors } = validate(commentValidate, comment);
  if (errors) return Response.error(res, 400, errors[0].message, errors[0]);

  const blog = await BlogModel.findById(blogId);
  if (!blog) return Response.error(res, 404, 'Blog not found!');

  const newComment = new CommentModel(comment);
  await newComment.save();

  blog.comments.push(newComment);
  blog.commentsCount += 1;

  await blog.save();

  return Response.success(
    res,
    201,
    newComment,
    'Successfully commented on post'
  );
});

export const removeComment = asyncHandler(async (req, res) => {
  const { commentId, blogId } = req.params;
  if (!blogId || !commentId)
    return Response.error(
      res,
      400,
      'Please provide an id for the blog and comment!'
    );

  const blog = await BlogModel.findById(blogId);
  if (!blog) return Response.error(res, 404, 'Blog not found!');

  if (!blog.comments.includes(commentId))
    return Response.error(res, 404, 'Comment not found!');

  blog.comments = blog.comments.filter((id) => id !== String(commentId));
  blog.commentsCount -= 1;

  await CommentModel.findByIdAndDelete(commentId);
  await blog.save();

  return Response.success(
    res,
    200,
    { comments: blog.comments, commentsCount: blog.commentsCount },
    'Successfully removed comment'
  );
});
