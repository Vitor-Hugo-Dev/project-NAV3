const { createUserService } = require('../services/userServices');
const { success } = require('../utils/statusCode');

module.exports = {
  createUserController: async (req, res, next) => {
    try {
      const user = req.body;
      const tokenCreator = req.user;
      const userCreator = await createUserService(user, tokenCreator);

      return res.status(success).json(userCreator);
    } catch (err) {
      return next(err);
    }
  },
};
