import joi from 'joi';

export const CreateSchema = joi.object().keys({
  title: joi.string().required().min(3),
  author: joi.string().required().min(5),
  body: joi.string().required().min(6),
  imageId: joi.string().required(),
  image: joi
    .string()
    .required()
    .pattern(
      /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,
      'link'
    ),
});

export const UpdateSchema = joi.object().keys({
  title: joi.string().min(3),
  body: joi.string().min(6),
  imageId: joi.string(),
  image: joi
    .string()
    .pattern(
      /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,
      'link'
    ),
});
