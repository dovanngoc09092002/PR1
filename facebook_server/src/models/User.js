module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isactive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });
  Users.associate = (models) => {
   
    Users.hasMany(models.Likes, {
      onDelete: "cascade",
    });
    Users.hasMany(models.Comments, {
      onDelete: "cascade",
    });
  };

  return Users;
};
