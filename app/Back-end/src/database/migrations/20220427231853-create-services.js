'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'services',
      {
        sku: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        serviceName: {
          allowNull: false,
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
