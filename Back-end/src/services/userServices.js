const { User } = require('../database/models');
const errorHandler = require("../utils/errorHandler");
const { badRequest } = require("../utils/statusCode");
const { userCreateValidation } = require('../utils/validateUser');
module.exports = {
  createUserService: async (user, creatorToken) => {
    const { role } = creatorToken;

    if (role !== 'admin')
      throw errorHandler(
        badRequest,
        'Apenas administradores podem criar usuários',
      );

    await userCreateValidation(user);

    const userCreate = await User.create(user);

    return userCreate;
  },
};
