const { registerPaymentService } = require('../services/paymentServices');
const { success } = require('../utils/statusCode');

module.exports = {
  registerPaymentController: async (req, res, next) => {
    const { id } = req.params;
    const paymentData = req.body;

    try {
      const payment = await registerPaymentService({
        peopleId: id,
        ...paymentData,
      });

      return res.status(success).json(payment);
    } catch (error) {
      return next(error);
    }
  },
};
