const { Payment } = require('../database/models');
const errorHandler = require('../utils/errorHandler');
const { notFound } = require('../utils/statusCode');
const { validatePayment } = require('../utils/paymentValidation');
const { updatePeopleService } = require('./peopleServices');
const Sequelize = require('sequelize');
const config = require('../database/config/config');
const sequelize = new Sequelize(config.development);

module.exports = {
  registerPaymentService: async (paymentData) => {
    const transaction = {
      transaction: await sequelize.transaction(),
    }; // inicia uma transação
    try {
      await validatePayment(paymentData);
      const newPayment = await Payment.create(paymentData, transaction);

      await updatePeopleService(
        paymentData.peopleId,
        {
          paymentMonth: newPayment.dataValues.paymentMonth,
        },
        transaction,
      );
      await transaction.transaction.commit(); // commita a transação
      return newPayment;
    } catch (error) {
      await transaction.transaction.rollback(); // rollbacka a transação
      throw errorHandler(notFound, error.message);
    }
  },
};
