const Joi = require('joi');
const { User } = require('../database/models');
const errorHandler = require("./errorHandler");
const { badRequest } = require("./statusCode");

const userScheema = Joi.object({
  email: Joi.string().required(),
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
  name: Joi.string()
    .min(5)
    .required(),
  role: Joi.string()
    .valid('admin', 'user')
    .required(),
});

module.exports = {
  userCreateValidation: async (user) => {
    const { error } = userScheema.validate(user)

    if (error) throw errorHandler(badRequest, error.message)

    const currentUser = await User.findOne({ where: { email: user.email } });

    if (currentUser) throw errorHandler(badRequest, 'Usuário já existe');

  },
}
