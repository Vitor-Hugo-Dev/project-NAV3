const { People } = require('../database/models');
const { peopleValidation } = require('../utils/peopleValidation');
const errorHandler = require('../utils/errorHandler');
const { badRequest, serverError } = require('../utils/statusCode');

module.exports = {
  createPeople: async ({ fullName, cpf, birthDate }) => {
    const { error } = peopleValidation({ fullName, cpf, birthDate });

    if (error) throw errorHandler(badRequest, error.message);
    

    try {
      const createPeople = await People.create({ fullName, cpf, birthDate, status: true });

      return createPeople.dataValues;
    } catch (error) {
      throw errorHandler(badRequest, error.message);
    }
  },

  getPeoples: async () => {
    try {
      const peoples = await People.findAll();

      return peoples;
    } catch (error) {
      throw errorHandler(serverError, error.message);
    }
  },

  getPeopleById: async (id) => {
    try {
      const people = await People.findByPk(id);

      return people;
    } catch (error) {
      throw errorHandler(serverError, error.message);
    }
  },

  getPeopleByCpf: async (cpf) => {
    try {
      const people = await People.findOne({ where: { cpf: cpf } });

      return people;
    } catch (error) {
      throw errorHandler(serverError, error.message);
    }
  },
 }