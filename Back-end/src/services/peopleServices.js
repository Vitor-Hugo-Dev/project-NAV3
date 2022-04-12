const { People } = require('../database/models');
const { peopleValidation } = require('../utils/peopleValidation');
const errorHandler = require('../utils/errorHandler');
const { badRequest } = require('../utils/statusCode');

module.exports = {
  createPeople: async ({ fullName, cpf, birthDate }) => {
    const { error } = peopleValidation({ fullName, cpf, birthDate });

    if (error) throw errorHandler(badRequest, error.message);
    

    try {
      const createPeople = await People.create({ fullName, cpf, birthDate, status: true });

      return createPeople.dataValues;
    } catch (error) {
      throw new Error(error);
    }
  },
}