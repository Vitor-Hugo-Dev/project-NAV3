module.exports = (sequelize, DataTypes) => {
  const contactInfos = sequelize.define('contactInfos', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    peopleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foregnKey: true,
      field: 'peopleId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  contactInfos.associate = (models) => {
    contactInfos.belongsTo(models.People, {
      foreignKey: 'peopleId',
      as: 'people',
    });
  };
  return contactInfos;
};
