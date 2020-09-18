import { asyncHandler } from '../middlewares';
import { queryValidate, validate } from '../validation';
import QueryModel from '../models/Query';
import Response from '../utils';

export const getAll = asyncHandler(async (req, res) => {
  const queries = await QueryModel.find();
  Response.success(
    res,
    200,
    { count: queries.length, queries },
    'Successfully retrieved'
  );
});

export const create = asyncHandler(async (req, res) => {
  const error = validate(queryValidate.CreateSchema, req.body);
  if (error) return Response.error(res, 400, error.details[0].message, error);

  const query = await QueryModel.create(req.body);

  return Response.success(res, 201, query, 'Query submitted!');
});
