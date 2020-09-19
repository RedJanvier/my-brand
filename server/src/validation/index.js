import * as blogValidate from './blog';
import * as userValidate from './user';
import commentValidate from './comment';
import subscriberValidate from './subscriber';
import queryValidate from './query';

function validate(schema, value) {
  const { error } = schema.validate(value);
  if (error) return error;
  return false;
}

export {
  validate,
  blogValidate,
  queryValidate,
  userValidate,
  commentValidate,
  subscriberValidate,
};
