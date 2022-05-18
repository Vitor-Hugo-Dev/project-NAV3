'use strict';
module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define(
    'Service',
    {
      serviceName: { type: DataTypes.STRING, allowNull: false },
      sku: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
    },
    {
      tableName: 'services',
      timestamps: false,
    },
  );
  Service.associate = (models) => {
    Service.hasMany(models.PeopleService, {
      foreignKey: 'serviceId',
      as: 'peoples',
    });
  };

  return Service;
};
