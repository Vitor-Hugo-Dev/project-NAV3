'use strict';
module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define(
    'Service',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      servicos: { type: DataTypes.STRING, allowNull: false },
    },
    {
      tableName: 'services',
    },
  );
  return Service;
};
