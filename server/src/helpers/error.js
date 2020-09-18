import logger from './logger';
import Response from '../utils';

export default (err, req, res, next) => {
  const error = { ...err, message: err.message };

  logger.error(error);

  if (err.name === 'CastError') {
    const message = `Resource not found of id ${err.value}`;
    return Response.error(res, 404, message, error);
  }
  if (err.code === 11000) {
    const message = 'Values entered already exist';
    return Response.error(res, 400, message, error);
  }
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    return Response.error(res, 400, message, error);
  }
  if (error.message === 'jwt expired') {
    return Response.error(res, 401, 'please signup/login first!', error);
  }
  if (
    error.message === `Cannot read property 'startsWith' of undefined` ||
    error.message === `No auth token`
  ) {
    return Response.error(res, 401, 'please provide a token', error);
  }
  if (error.message === `jwt malformed`) {
    return Response.error(res, 401, 'please provide a valid token', error);
  }
  logger.error(error);

  Response.error(res, error.statusCode, error.message, error);
  return next();
};
