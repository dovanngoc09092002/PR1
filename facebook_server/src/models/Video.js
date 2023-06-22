module.exports = (sequelize, DataTypes) => {
  const Videos = sequelize.define("Videos", {
    UserId: DataTypes.INTEGER,
    video: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Videos.associate = (models) => {
    Videos.belongsTo(models.Users, { foreignKey: "UserId", as: "user" });
  };
  return Videos;
};
