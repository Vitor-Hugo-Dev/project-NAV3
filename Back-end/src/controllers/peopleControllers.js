const { createPeople } = require('../services/peopleServices');
const { success } = require('../utils/statusCode');

module.exports = {
  createPeople: async (req, res, next) => {
    const { fullName, cpf, birthDate } = req.body;

    try {
      const newPeople = await createPeople({ fullName, cpf, birthDate });

      return res.status(success).json(newPeople);
    } catch (error) {
      return next(error);
    }
  },
}