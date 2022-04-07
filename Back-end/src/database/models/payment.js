module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    value: { type: DataTypes.DECIMAL, allowNull: false },
    peopleId: { type: DataTypes.INTEGER, allowNull: false, foreignKey: true, field: 'peopleId' },
  },
  {
    timestamps: true,
    tableName: 'payments',
    createdAt: 'paymentDate',
  })
  Payment.associate = (models) => {
    Payment.belongsTo(models.People, { foreignKey: 'peopleId', as: 'people' });
  }

  return Payment;
};