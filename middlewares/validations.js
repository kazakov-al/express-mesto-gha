const { Joi, celebrate } = require('celebrate');
const { ObjectId } = require('mongoose').Types;

const urlRegExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/;

const validateId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().custom((value, helpers) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message('Невалидный id');
    }),
  }),
});

const validateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(urlRegExp),
  }),
});

const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    password: Joi.string().required(),
    email: Joi.string().required().email(),
    avatar: Joi.string().pattern(urlRegExp),
  }),
});

const validateAvatar = celebrate({
  body: {
    avatar: Joi.string().required().pattern(urlRegExp),
  },
});

const validateUserInfo = celebrate({
  body: {
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  },
});

module.exports = {
  urlRegExp,
  validateId,
  validateCard,
  validateUser,
  validateAvatar,
  validateUserInfo,
};
