import * as blogValidate from './blog';
import queryValidate from './query';
import Response from '../utils';

function validate(schema, value, res) {
  const { error } = [schema].validate(value);
  if (error) Response.error(res, 400, error.details[0].message, error);
}

export { validate, blogValidate, queryValidate };
