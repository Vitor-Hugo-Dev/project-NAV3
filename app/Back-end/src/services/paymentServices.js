const { Payment } = require('../database/models');
const errorHandler = require('../utils/errorHandler');
const { notFound } = require('../utils/statusCode');
const { validatePayment } = require('../utils/paymentValidation');

module.exports = {
  registerPaymentService: async (paymentData) => {
    try {
      await validatePayment(paymentData);
      const newPayment = await Payment.create(paymentData);

      return newPayment;
    } catch (error) {
      throw errorHandler(notFound, error.message);
    }
  },
};