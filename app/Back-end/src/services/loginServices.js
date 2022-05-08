const createToken = require('../utils/createToken');
const { loginValidation } = require('../utils/validateLogin');

module.exports = {
  loginServices: async ({ email, password }) => {
    const validUser = await loginValidation({ email, password });

    const token = createToken({
      email: validUser.email,
      id: validUser.id,
      role: validUser.role,
    });

    return {token, ...validUser};
  },
};
