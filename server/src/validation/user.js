import joi from 'joi';

export const CreateSchema = joi.object().keys({
  name: joi.string().required().min(3),
  email: joi
    .string()
    .required()
    .min(5)
    .pattern(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'email'
    ),
  image: joi
    .string()
    .required()
    .min(8)
    .pattern(
      /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,
      'link'
    ),
  imageId: joi.string().required().min(3),
  password: joi
    .string()
    .required()
    .min(6)
    .pattern(/^[a-zA-Z\d\s.!@#$%&*()_+-=:?]{6,}$/, 'password'),
});

export const UpdateSchema = joi.object().keys({
  name: joi.string().min(3),
  image: joi
    .string()
    .min(8)
    .pattern(
      /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,
      'link'
    ),
  imageId: joi.string().min(3),
  password: joi
    .string()
    .min(6)
    .pattern(/^[a-zA-Z\d\s.!@#$%&*()_+-=:?]{6,}$/, 'password'),
});

export const LoginSchema = joi.object().keys({
  email: joi
    .string()
    .min(6)
    .required()
    .pattern(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'email'
    ),
  password: joi
    .string()
    .min(5)
    .required()
    .pattern(/^[a-zA-Z\d\s.!@#$%&*()_+-=:?]{6,}$/, 'password'),
});
