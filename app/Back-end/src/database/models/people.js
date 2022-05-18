module.exports = (sequelize, DataTypes) => {
  const People = sequelize.define(
    'People',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      fullName: { type: DataTypes.STRING, allowNull: false },
      cpf: { type: DataTypes.STRING, allowNull: false },
      birthDate: { type: DataTypes.STRING, allowNull: false },
      paymentMonth: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: new Date().getMonth() + 1,
      },
    },
    {
      tableName: 'peoples',
    },
  );
  People.associate = (models) => {
    People.hasMany(models.PeopleService, {
      foreignKey: 'peopleId',
      as: 'services',
    });
    People.hasMany(models.Payment, { foreignKey: 'peopleId', as: 'payments' });
    People.hasOne(models.Address, { foreignKey: 'peopleId', as: 'address' });
    People.hasOne(models.ContactInfos, {
      foreignKey: 'peopleId',
      as: 'contacts',
    });
  };

  return People;
};
