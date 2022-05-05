'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      value: {
        allowNull: false,
        type: Sequelize.STRING,
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
      createdAt: {
        allowNull: false,
        field: 'paymentDate',
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('payments');
  },
};
