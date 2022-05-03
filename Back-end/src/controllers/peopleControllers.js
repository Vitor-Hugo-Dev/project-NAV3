const {
  createPeopleService,
  getPeoplesService,
  getPeopleByIdService,
  getPeopleByCpfService,
  getDebtorPeoplesService,
  deletePeopleService,
  getPeoplesByPartNameService,
} = require('../services/peopleServices');
const errorHandler = require('../utils/errorHandler');
const { success, noContent, badRequest } = require('../utils/statusCode');

module.exports = {
  createPeopleController: async (req, res, next) => {
    const { personalData, addressData } = req.body;

    try {
      const newPeople = await createPeopleService(personalData, addressData);

      return res.status(success).json(newPeople);
    } catch (error) {
      return next(error);
    }
  },

  getPeoplesController: async (req, res, next) => {
    try {
      const peoples = await getPeoplesService();

      return res.status(success).json(peoples);
    } catch (error) {
      return next(error);
    }
  },

  getPeopleByIdController: async (req, res, next) => {
    const { id } = req.params;

    try {
      const people = await getPeopleByIdService(id);

      return res.status(success).json(people);
    } catch (error) {
      return next(error);
    }
  },

  getPeopleByCpfController: async (req, res, next) => {
    const { cpf } = req.body;

    try {
      const people = await getPeopleByCpfService(cpf);

      return res.status(success).json(people);
    } catch (error) {
      return next(error);
    }
  },
  getDebtorPeoplesController: async (req, res, next) => {
    try {
      const debtorPeoples = await getDebtorPeoplesService();

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
      return res.status(noContent).end();
    } catch (error) {
      return next(error);
    }
  },
  dinamicGetPeoplesController: async (req, res, next) => {
    const { role, termo } = req.body;
    try {
      if (role === 'cpf') {
        try {
          const people = await getPeopleByCpfService(termo);
          return res.status(success).json(people);
        } catch (error) {
          return next(error);
        }
      } else if (role === 'id') {
        try {
          const people = await getPeopleByIdService(termo);
          return res.status(success).json(people);
        } catch (error) {
          return next(error);
        }
      } else if (role === 'name') {
        try {
          const peoples = await getPeoplesByPartNameService(termo);
          return res.status(success).json(peoples);
        } catch (error) {
          return next(error);
        }
      } else throw errorHandler(badRequest, 'Parâmetro inválido');
    } catch (error) {
      return next(error);
    }
  },
};
