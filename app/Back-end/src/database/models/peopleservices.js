module.exports = (sequelize, _DataTypes) => {
  const PeopleService = sequelize.define(
    'PeopleService',
    {},
    { timestamps: false },
  );

  PeopleService.associate = (models) => {
    models.People.belongsToMany(models.Service, {
      as: 'Service',
      through: PeopleService,
      foreignKey: 'peopleId',
      otherKey: 'serviceId',
    });
    models.Service.belongsToMany(models.People, {
      as: 'posts',
      through: PeopleService,
      foreignKey: 'serviceId',
      otherKey: 'peopleId',
    });
  };
  return PeopleService;
};
