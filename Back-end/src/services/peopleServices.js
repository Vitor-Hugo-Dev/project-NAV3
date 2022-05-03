const { People, Address } = require('../database/models');
const { peopleValidation } = require('../utils/peopleValidation');
const { validateAddress } = require('../utils/addressValidation');
const errorHandler = require('../utils/errorHandler');
const { badRequest, serverError, notFound } = require('../utils/statusCode');
const { createAddress } = require('./addressServices');

module.exports = {
  createPeople: async (personalData, addressData) => {
    const { error: personalError } = await peopleValidation(personalData);
    const { error: addressError } = validateAddress(addressData);

    if (personalError) throw errorHandler(badRequest, personalError.message);
    if (addressError) throw errorHandler(badRequest, addressError.message);

    try {
      const { dataValues: dataPeople } = await People.create(personalData);
      // console.log('criou pessoa');
      if (!dataPeople) throw errorHandler(serverError, 'Erro ao criar pessoa');

      const addRess = await createAddress({
        ...addressData,
        peopleId: dataPeople.id,
      });
      return { ...dataPeople, ...addRess };
    } catch (error) {
      throw errorHandler(badRequest, error.message);
    }
  },

  getPeoples: async () => {
    try {
      const peoples = await People.findAll({
        include: [
          {
            model: Address,
            as: 'address',
          },
        ],
      });

      return peoples;
    } catch (error) {
      throw errorHandler(serverError, error.message);
    }
  },

  getPeopleById: async (id) => {
    try {
      const people = await People.findByPk(id, {
        include: [
          {
            model: Address,
            as: 'address',
          },
        ],
      });
      if (!people) throw errorHandler(notFound, 'Pessoa não encontrada');

      return people;
    } catch (error) {
      throw errorHandler(error.status, error.message);
    }
  },
  getPeopleByCpf: async (cpf) => {
    try {
      const people = await People.findOne({
        where: { cpf: cpf },
        include: [{ model: Address, as: 'address' }],
      });
      if (!people) throw errorHandler(notFound, 'Pessoa não encontrada');

      return people;
    } catch (error) {
      throw errorHandler(error.status, error.message);
    }
  },
  getDebtorPeoples: async () => {
    try {
      const peoples = await People.findAll({
        include: [
          {
            model: Address,
            as: 'address',
          },
        ],
      });

      return peoples;
    } catch (error) {
      throw errorHandler(serverError, error.message);
    }
  },
  deletePeopleService: async (id) => {
    try {
      const people = await People.findByPk(id); //busca a pessoa.
      if (!people) throw errorHandler(notFound, 'Pessoa não encontrada'); //se não encontrar, retorna erro.
      people.destroy(); //caso exista, é deletada. (verificar se o cascade está funcionando))
    } catch (err) {
      throw errorHandler(notFound, err.message);
    }
  },
};
