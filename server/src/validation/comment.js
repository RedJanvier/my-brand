import joi from 'joi';

const CreateSchema = joi.object().keys({
  author: joi.string().required().min(3),
  body: joi.string().required().min(6),
});

export default CreateSchema;
