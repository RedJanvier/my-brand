import { asyncHandler } from '../middlewares';
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
  const { name, email, body } = req.body;
  if (!body || !name || !email)
    return Response.error(res, 400, 'Please provide all query info!');

  const query = await QueryModel.create({ email, body, name });

  return Response.success(res, 201, query, 'Query submitted!');
});
