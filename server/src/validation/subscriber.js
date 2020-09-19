import joi from 'joi';

const CreateSchema = joi.object().keys({
  email: joi
    .string()
    .required()
    .min(5)
    .pattern(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'email'
    ),
});

export default CreateSchema;
