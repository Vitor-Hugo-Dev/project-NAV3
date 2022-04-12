const { createPeople, getPeoples } = require('../services/peopleServices');
const { success } = require('../utils/statusCode');

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
}