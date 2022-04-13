const { loginServices } = require('../services/loginServices');
const { success } = require("../utils/statusCode");

module.exports = {
  loginControler: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const payload = await loginServices({ email, password });

      return res.status(success).json(payload);
    } catch (err) {
      return next(err);
    }
  },
};
