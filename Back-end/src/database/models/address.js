'use strict';
module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define(
    'Address',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      peopleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
        field: 'peopleId',
      },
      district: { type: DataTypes.STRING, allowNull: false },
      street: { type: DataTypes.STRING, allowNull: false },
      number: { type: DataTypes.INTEGER, allowNull: false },
      complement: { type: DataTypes.STRING, allowNull: false },
    },
    {
      tableName: 'addresses',
      timestamps: false,
    },
  );
  Address.associate = (models) => {
    Address.belongsTo(models.People, { foreignKey: 'peopleId', as: 'people' });
  };
  return Address;
};
