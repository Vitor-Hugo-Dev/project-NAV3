module.exports = (sequelize, _DataTypes) => {
  const PeopleService = sequelize.define(
    'PeopleService',
    {
      description: {
        type: _DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false },
  );

  PeopleService.associate = (models) => {
    models.People.belongsToMany(models.Service, {
      as: 'service',
      through: PeopleService,
      foreignKey: 'peopleId',
      otherKey: 'serviceId',
    });
    models.Service.belongsToMany(models.People, {
      as: 'people',
      through: PeopleService,
      foreignKey: 'serviceId',
      otherKey: 'peopleId',
    });
  };
  return PeopleService;
};
