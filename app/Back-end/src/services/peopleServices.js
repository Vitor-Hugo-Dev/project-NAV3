const { People, Address, Payment } = require('../database/models');
const { peopleValidation } = require('../utils/peopleValidation');
const errorHandler = require('../utils/errorHandler');
const { badRequest, serverError, notFound } = require('../utils/statusCode');
const { createAddress } = require('./addressServices');
const { Op } = require('sequelize');

const Sequelize = require('sequelize');
const config = require('../database/config/config');
const { createContactInfos } = require('./contactInfosServices');
const sequelize = new Sequelize(config.development);

module.exports = {
  createPeopleService: async (personalData, addressData, contactInfo) => {
    const { error } = await peopleValidation(personalData); // valida os dados pessoais

    if (error) throw errorHandler(badRequest, error.message);

    const transaction = {
      transaction: await sequelize.transaction(),
    }; // inicia uma transação

    try {
      const { dataValues: dataPeople } = await People.create(
        personalData,
        transaction,
      );
      if (!dataPeople) throw errorHandler(serverError, 'Erro ao criar pessoa');

      const contact = await createContactInfos(
        { ...contactInfo, peopleId: dataPeople.id },
        transaction,
      );

      const addRess = await createAddress(
        {
          ...addressData,
          peopleId: dataPeople.id,
        },
        transaction, // ponto de transação
      );
      await Payment.create(
        {
          peopleId: dataPeople.id,
          paymentMonth: new Date().getMonth() + 1,
          value: '5.00',
        },
        transaction,
      );

      await transaction.transaction.commit(); // commita a transação
      return { ...dataPeople, ...addRess, ...contact };
    } catch (error) {
      await transaction.transaction.rollback(); // rollbacka a transação
      throw errorHandler(badRequest, error.message);
    }
  },

  getPeoplesService: async () => {
    try {
      const peoples = await People.findAll({
        include: [
          {
            model: Address,
            as: 'address',
          },
          {
            model: Payment,
            as: 'payments',
          },
        ],
      });

      return peoples;
    } catch (error) {
      throw errorHandler(serverError, error.message);
    }
  },
  getPeopleByIdService: async (id) => {
    try {
      const people = await People.findByPk(id, {
        include: [
          {
            model: Address,
            as: 'address',
          },
          {
            model: Payment,
            as: 'payments',
          },
        ],
      });
      if (!people) throw errorHandler(notFound, 'Pessoa não encontrada');

      return people;
    } catch (error) {
      throw errorHandler(error.status, error.message);
    }
  },
  getPeopleByCpfService: async (cpf) => {
    try {
      const people = await People.findOne({
        where: { cpf: cpf },
        include: [
          { model: Address, as: 'address' },
          {
            model: Payment,
            as: 'payments',
          },
        ],
      });
      if (!people) throw errorHandler(notFound, 'Pessoa não encontrada');
      console.log(JSON.stringify(people.dataValues.payments[0]));
      return people;
    } catch (error) {
      throw errorHandler(error.status, error.message);
    }
  },
  getPeoplesByPartNameService: async (partName) => {
    try {
      const peoples = await People.findAll({
        where: {
          fullName: {
            [Op.like]: `%${partName}%`, // https://github.com/tryber/Trybe-CheatSheets/tree/master/backend/sequelize/queries#operadores
          },
          payments: {
            paymentDate: {
              [Op.gte]: new Date('2022-06-01'),
            },
          },
        },
        include: [
          {
            model: Address,
            as: 'address',
          },
          {
            model: Payment,
            as: 'payments',
            // where: {
            //   paymentDate: {
            //     []
            //   }
            // }
          },
        ],
      });

      return peoples;
    } catch (error) {
      throw errorHandler(serverError, error.message);
    }
  },
  getDebtorPeoplesService: async () => {
    try {
      const peoples = await People.findAll({
        include: [
          {
            model: Address,
            as: 'address',
          },
          {
            where: {
              paymentDate: {},
            },
            model: Payment,
            as: 'payments',
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
  updatePeopleService: async (id, personalData) => {
    await People.update(personalData, {
      where: { id },
    });
  },
};
