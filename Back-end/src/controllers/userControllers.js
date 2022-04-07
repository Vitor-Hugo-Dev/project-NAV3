const { createUserService } = require('../services/userServices');
const { success } = require('../utils/statusCode');

module.exports = {
  createUserController: async (req, res, next) => {
    try {
      const user = req.body;

      const createUser = await createUserService(user);

      return res.status(success).json(createUser);
    } catch (err) {
      return next(err);
    }
  },
};
