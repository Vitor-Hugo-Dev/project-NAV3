const { Address } = require('../database/models');
const errorHandler = require('../utils/errorHandler');
const { badRequest } = require('../utils/statusCode');

module.exports = {
  createAddress: async (address) => {
    try {
      const { dataValues } = await Address.create(address);
      // console.log('criou endereço');
      return dataValues;
    } catch (error) {
      throw errorHandler(badRequest, error.message);
    }
  },
};
