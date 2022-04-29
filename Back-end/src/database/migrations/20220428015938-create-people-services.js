'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'peopleServices',
      {
        serviceId: {
          primaryKey: true,
          allowNull: false,
          type: Sequelize.INTEGER,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          references: {
            model: 'services',
            key: 'id',
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
