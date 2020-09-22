import { userValidate, validate } from '../validation';
import { decryptPassword, encryptPassword, signToken } from '../helpers';
import { asyncHandler } from '../middlewares';
import UserModel from '../models/User';
import Response from '../utils';

export const signup = asyncHandler(async (req, res) => {
  const { image, imageId } = req;
  const data = { ...req.body, image, imageId };

  const { details: errors } = validate(userValidate.CreateSchema, data);
  if (errors)
    return Response.error(
      res,
      400,
      `Please provide ${errors[0].context.key}`,
      errors[0]
    );
  const hash = await encryptPassword(data.password);
  const user = await UserModel.create({ ...data, password: hash });
  if (!user) return Response.error(res, 500, 'User not created!');

  return Response.success(res, 201, signToken(user));
});

export const login = asyncHandler(async (req, res) => {
  const { details: errors } = validate(userValidate.LoginSchema, req.body);
  if (errors)
    return Response.error(
      res,
      400,
      `Please provide ${errors[0].context.key} `,
      errors[0]
    );

  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) return Response.error(res, 404, 'Wrong Credentials!');
  if (!(await decryptPassword(password, user.password)))
    return Response.error(res, 401, 'Wrong credentials!');

  const token = signToken(user);

  return Response.success(res, 200, token, 'Successfully logged in!');
});

export const oauthLogin = asyncHandler(async (req, res) => {
  const { user } = req;
  const token = signToken(user);

  return Response.success(res, 200, token, 'Successfully logged in!');
});

export const profile = asyncHandler(async (req, res) => {
  const error = validate(userValidate.UpdateSchema, req.body);
  if (error) return Response.error(res, 400, error.details[0].message, error);

  const user = await UserModel.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true, runValidators: true }
  );
  if (!user) return Response.error(res, 404, 'User not found!');

  return Response.success(res, 200, user);
});
