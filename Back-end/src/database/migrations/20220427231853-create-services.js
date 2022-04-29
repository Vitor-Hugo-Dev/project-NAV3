'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'services',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        servicos: {
          type: Sequelize.STRING,
        },
      },
      {
        timestamp: false,
      },
    );
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('services');
  },
};
