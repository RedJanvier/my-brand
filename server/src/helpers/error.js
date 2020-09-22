import logger from './logger';
import Response from '../utils';

export default (err, req, res, next) => {
  const error = { ...err, message: err.message, statusCode: 500 };
  let message = 'Internal Server error';

  if (err.name === 'CastError') {
    message = `Resource not found of id ${err.value}`;
    error.statusCode = 404;
  }
  if (err.code === 11000) {
    message = `Values entered already exist (${
      err.message.split('"')[1].split('"')[0]
    })`;
    error.statusCode = 409;
  }
  if (err.name === 'ValidationError') {
    message = Object.values(err.errors).map((val) => val.message);
    error.statusCode = 400;
  }
  if (error.message === `No auth token`) {
    message = 'please provide a token';
    error.statusCode = 401;
  }
  logger.error(error);

  Response.error(res, error.statusCode, error.message || message, error);
  return next();
};
