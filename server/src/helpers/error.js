import logger from './logger';
import Response from '../utils';

export default (err, req, res, next) => {
  const error = { ...err, message: err.message };

  logger.error(error);

  if (err.name === 'CastError') {
    const message = `Resource not found of id ${err.value}`;
    return Response.error(res, 404, message);
  }
  if (err.code === 11000) {
    const message = 'Values entered already exist';
    return Response.error(res, 400, message);
  }
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    return Response.error(res, 400, message);
  }
  Response.error(res, error.statusCode, error.message, error);
  return next();
};
