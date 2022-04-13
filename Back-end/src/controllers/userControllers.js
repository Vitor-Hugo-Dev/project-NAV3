const { createUserService } = require('../services/userServices');
const { success } = require('../utils/statusCode');

module.exports = {
  createUserController: async (req, res, next) => {
    try {
      const user = req.body;
      const creatorToken = req.user;
      const createUser = await createUserService(user, creatorToken);

      return res.status(success).json(createUser);
    } catch (err) {
      return next(err);
    }
  },
};
