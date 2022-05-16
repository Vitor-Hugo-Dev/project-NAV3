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
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      district: { type: DataTypes.STRING, allowNull: false },
      neighborhood: { type: DataTypes.STRING, allowNull: false },
      street: { type: DataTypes.STRING, allowNull: false },
      number: { type: DataTypes.INTEGER, allowNull: false },
      complement: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
      },
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
