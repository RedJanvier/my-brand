import { userValidate, validate } from '../validation';
import { encryptPassword, signToken } from '../helpers';
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
  const hash = await encryptPassword(this.password);
  const user = await UserModel.create({ ...data, password: hash });
  if (!user) return Response.error(res, 500, 'User not created!');

  return Response.success(
    res,
    201,
    signToken({
      email: user.email,
      userId: user._id,
      name: user.name,
    })
  );
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
  if (!(await user.isValidPassword(password)))
    return Response.error(res, 403, 'Wrong credentials!');

  const token = signToken({
    email: user.email,
    userId: user._id,
    name: user.name,
    image: user.image,
  });

  return Response.success(res, 200, token, 'Successfully logged in!');
});

export const oauthLogin = asyncHandler(async (req, res) => {
  const { user } = req;
  const token = signToken({
    email: user.email,
    userId: user._id,
    name: user.name,
    image: user.image,
  });

  return Response.success(res, 200, token, 'Successfully logged in!');
});

export const profile = asyncHandler(async (req, res) => {
  const error = validate(userValidate.UpdateSchema, req.body);
  if (error) return Response.error(res, 400, error.details[0].message, error);

  const user = await UserModel.findOne({ _id: req.params.id });
  if (!user) return Response.error(res, 404, 'User not found!');

  await user.update(req.body);

  return Response.success(res, 200, user);
});