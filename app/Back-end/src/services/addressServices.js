const { Address } = require('../database/models');
const { validateAddress } = require('../utils/addressValidation');
const errorHandler = require('../utils/errorHandler');
const { badRequest } = require('../utils/statusCode');

module.exports = {
  createAddress: async (address) => {
    const { error: addressError } = validateAddress(address); // valida os dados de endereço

    if (addressError) throw errorHandler(badRequest, addressError.message);
    try {
      const { dataValues } = await Address.create(address);
      return dataValues;
    } catch (error) {
      throw errorHandler(badRequest, error.message);
    }
  },
};
