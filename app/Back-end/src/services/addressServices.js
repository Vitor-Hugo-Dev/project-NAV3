const { Address } = require('../database/models');
const { validateAddress } = require('../utils/addressValidation');
const errorHandler = require('../utils/errorHandler');
const { badRequest } = require('../utils/statusCode');

module.exports = {
  createAddress: async (address, transaction) => {
    validateAddress(address); // valida os dados de endereço

    try {
      const { dataValues } = await Address.create(address, transaction);
      return dataValues;
    } catch (error) {
      throw errorHandler(badRequest, error.message);
    }
  },
};
