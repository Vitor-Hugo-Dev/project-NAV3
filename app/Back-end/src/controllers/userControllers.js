const { createUserService } = require('../services/userServices');
const { success } = require('../utils/statusCode');

module.exports = {
  createUserController: async (req, res, next) => {
    try {
      const user = req.body;
      const tokenCreator = req.user;
      const {
        dataValues: { id, email, name, role },
      } = await createUserService(user, tokenCreator);

      return res.status(success).json({ id, email, name, role });
    } catch (err) {
      return next(err);
    }
  },
};
