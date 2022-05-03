const {
  createPeople,
  getPeoples,
  getPeopleById,
  getPeopleByCpf,
  getDebtorPeoples,
  deletePeopleService,
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
  getDebtorPeoples: async (req, res, next) => {
    try {
      const debtorPeoples = await getDebtorPeoples();

      return res.status(success).json(debtorPeoples);
    } catch (error) {
      return next(error);
    }
  },
  deletePeopleController: async (req, res, next) => {
    const { id } = req.params;
    try {
      await deletePeopleService(id);
      console.log('deletou');
      return res.status(success).json({ message: 'Deletado com sucesso' });
    } catch (error) {
      return next(error);
    }
  },
};
