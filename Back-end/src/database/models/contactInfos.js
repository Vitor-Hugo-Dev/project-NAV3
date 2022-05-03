module.exports = (sequelize, DataTypes) => {
  const ContactInfos = sequelize.define('ContactInfos', {
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
  ContactInfos.associate = (models) => {
    ContactInfos.belongsTo(models.People, {
      foreignKey: 'peopleId',
      as: 'people',
    });
  };
  return ContactInfos;
};
