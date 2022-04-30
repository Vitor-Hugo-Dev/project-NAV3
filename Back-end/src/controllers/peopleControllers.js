const {
  createPeople,
  getPeoples,
  getPeopleById,
  getPeopleByCpf,
} = require('../services/peopleServices');
const { success } = require('../utils/statusCode');

module.exports = {
  createPeople: async (req, res, next) => {
    const { personalData, addressData } = req.body;

    try {
      const newPeople = await createPeople(personalData, addressData);

      return res.status(success).json(newPeople);
    } catch (error) {
      return next(error);
    }
  },

  getPeoples: async (req, res, next) => {
    try {
      const peoples = await getPeoples();

      return res.status(success).json(peoples);
    } catch (error) {
      return next(error);
    }
  },

  getPeopleById: async (req, res, next) => {
    const { id } = req.params;

    try {
      const people = await getPeopleById(id);

      return res.status(success).json(people);
    } catch (error) {
      return next(error);
    }
  },

  getPeopleByCpf: async (req, res, next) => {
    const { cpf } = req.body;

    try {
      const people = await getPeopleByCpf(cpf);

      return res.status(success).json(people);
    } catch (error) {
      return next(error);
    }
  },
};
