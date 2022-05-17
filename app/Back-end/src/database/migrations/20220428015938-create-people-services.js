'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'peopleServices',
      {
        description: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: '',
        },
        serviceId: {
          primaryKey: true,
          allowNull: false,
          type: Sequelize.INTEGER,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          references: {
            model: 'services',
            key: 'sku',
          },
        },
        peopleId: {
          primaryKey: true,
          allowNull: false,
          type: Sequelize.INTEGER,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          references: {
            model: 'peoples',
            key: 'id',
          },
        },
      },
      {
        timestamps: false,
      },
    );
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('peopleServices');
  },
};
