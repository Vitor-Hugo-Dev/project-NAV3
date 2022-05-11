const { User } = require('../database/models');
const errorHandler = require('../utils/errorHandler');
const { badRequest } = require('../utils/statusCode');
const { userCreateValidation } = require('../utils/validateUser');
const cryptoPassword = require('../utils/cryptoFunction');
module.exports = {
  createUserService: async (user, creatorToken) => {
    const { role: creatorRole } = creatorToken;
    const { email, password, name, role } = user;
    if (creatorRole !== 'admin')
      throw errorHandler(
        badRequest,
        'Apenas administradores podem criar usuários',
      );

    await userCreateValidation(user);

    const userCreate = await User.create({
      email,
      password: cryptoPassword(password),
      name,
      role,
    });
    return userCreate;
  },
};
