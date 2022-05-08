'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'contactInfos',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        phoneNumber: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('contactInfos');
  },
};
