const { ContactInfos } = require('../database/models');
const {
  validateCreateContactInfos,
} = require('../utils/contactInfosValidation');
const errorHandler = require('../utils/errorHandler');
const { badRequest } = require('../utils/statusCode');

module.exports = {
  createContactInfos: async (contactData, transaction) => {
    validateCreateContactInfos(contactData);
    try {
      const { dataValues } = await ContactInfos.create(
        contactData,
        transaction,
      );

      return dataValues;
    } catch (err) {
      throw errorHandler(badRequest, err.message);
    }
  },
};
