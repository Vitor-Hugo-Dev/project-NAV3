'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      peopleId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'peopleId',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'peoples',
          key: 'id',
        },
      },
      district: { type: Sequelize.STRING, allowNull: false },
      street: { type: Sequelize.STRING, allowNull: false },
      number: { type: Sequelize.INTEGER, allowNull: false },
      complement: { type: Sequelize.STRING, allowNull: false },
    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('addresses');
  },
};
