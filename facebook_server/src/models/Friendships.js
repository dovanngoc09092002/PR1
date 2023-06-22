module.exports = (sequelize, DataTypes) => {
  const Friendships = sequelize.define("Friendships", {
    senderId: DataTypes.INTEGER,
    receiverId: DataTypes.INTEGER,
    status: {
      type: DataTypes.ENUM("pending", "accepted", "rejected"),
      allowNull: false,
      defaultValue: "pending",
    },
  });

  Friendships.associate = (models) => {
    Friendships.belongsTo(models.Users, {
      foreignKey: "senderId",
      as: "sender",
    });
    Friendships.belongsTo(models.Users, {
      foreignKey: "receiverId",
      as: "receiver",
    });
  };

  return Friendships;
};
