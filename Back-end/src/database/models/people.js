module.exports = (sequelize, DataTypes) => {
  const People = sequelize.define('People', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    fullName: { type: DataTypes.STRING, allowNull: false },
    cpf: { type: DataTypes.STRING, allowNull: false },
    birthDate: { type: DataTypes.DATE, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
  },
  {
    tableName: 'peoples',
  });
  People.associate = (models) => {
    People.hasMany(models.Payment, { foreignKey: 'peopleId', as: 'payments' });
  }

  return People;
};
