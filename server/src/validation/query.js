import joi from 'joi';

const CreateSchema = joi.object().keys({
  name: joi.string().required().min(3),
  email: joi
    .string()
    .required()
    .min(8)
    .pattern(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'email'
    ),
  body: joi.string().required().min(6),
});

export default CreateSchema;
