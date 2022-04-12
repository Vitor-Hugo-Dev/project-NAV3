const { createPeople, getPeoples, getPeopleById, getPeopleByCpf } = require('../services/peopleServices');
const { success, notFound } = require('../utils/statusCode');

module.exports = {
  createPeople: async (req, res, next) => {
    // precisa validar o token

    const { fullName, cpf, birthDate } = req.body;

    try {
      const newPeople = await createPeople({ fullName, cpf, birthDate });

      return res.status(success).json(newPeople);
    } catch (error) {
      return next(error);
    }
  },

  getPeoples: async (req, res, next) => {
    // precisa validar o token

    try {
      const peoples = await getPeoples();

      return res.status(success).json(peoples);
    } catch (error) {
      return next(error);
    }
  },

  getPeopleById: async (req, res, next) => {
    // precisa validar o Token
    const { id } = req.params;

    try {
      const people = await getPeopleById(id);
      
      if (people) return res.status(success).json(people); 

      return res.status(notFound).message({ message: 'Pessoa não encontrada' });
    } catch(error) {
      return next(error);
    }
  },

  getPeopleByCpf: async (req, res, next) => {
    // precisa validar o Token
    const { cpf } = req.body;

    try {
      const people = await getPeopleByCpf(cpf);
      console.log(people);

      if (people) return res.status(success).json(people);

      return res.status(notFound).json({ message: 'Pessoa não encontrada' });
    } catch (error) {
      return next(error);
    }
  },
}