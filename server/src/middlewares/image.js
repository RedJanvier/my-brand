import cloudinary from '../config/cloudinary';
import asyncHandler from './async';
import Response from '../utils';

export const uploadImage = asyncHandler(async (req, res, next) => {
  if (!req.files) return Response.error(res, 400, 'Please provide an image!');

  const { tempFilePath } = req.files.image;
  const { url, public_id: pid } = await cloudinary.upload(
    tempFilePath,
    (_, result) => result
  );

  req.image = url;
  req.imageId = pid;
  return next();
});

export const deleteImage = async (res, id) => {
  const { result } = await cloudinary.destroy(id, (err, reslt) => {
    if (err) Response.error(res, 503, err.message, err);
    return reslt;
  });
  if (result !== 'ok') Response.error(res, 500, 'Unable to delete image');
};
