const Joi = require('joi');
const { User } = require('../database/models');
const errorHandler = require('../utils/errorHandler');
const { badRequest, notFound } = require('./statusCode');
const cryptoPass = require('./cryptoFunction');

const loginValidation = async ({ email, password }) => {
  const schema = Joi.object({
    // regex de senha forte: https://pt.stackoverflow.com/questions/373574/regex-para-senha-forte
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string()
      .min(8)
      .pattern(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/,
      )
      .messages({
        'string.pattern.base': 'A senha deve estar no formato correto',
        'string.min': 'Senha deve conter pelo menos 8 caracteres',
      })
      .required(),
  }).options({ abortEarly: false });

  const { error } = schema.validate({ email, password });

  if (error) throw errorHandler(badRequest, error.message);

  const currentUser = await User.findOne({ where: { email }, raw: true });

  if (!currentUser) throw errorHandler(notFound, 'Usuario não encontrado');
  if (currentUser.password !== cryptoPass(password))
    throw errorHandler(notFound, 'Senha incorreta');

  return {
    email: currentUser.email,
    id: currentUser.id,
    role: currentUser.role,
    name: currentUser.name.split(' ')[0],
  };
};

module.exports = {
  loginValidation,
};
