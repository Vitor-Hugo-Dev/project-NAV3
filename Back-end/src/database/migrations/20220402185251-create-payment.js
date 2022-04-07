'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      value: {
        allowNull: false,
        type: Sequelize.STRING
      },
      peopleId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'peopleId',
        references: {
          model: 'peoples',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        field: 'paymentDate',
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('payments');
  }
};