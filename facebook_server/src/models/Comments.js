module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define("Comments", {
    commentBody: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    likeCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    parentCommentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Comments",
        key: "id",
      },
    },
  });
  Comments.associate = (models) => {
    Comments.belongsTo(models.Users, {
      foreignKey: "UserId",
      as: "user",
    });
    Comments.belongsTo(models.Comments, {
      as: "parentComment",
      foreignKey: "parentCommentId",
    });
    Comments.hasMany(models.Comments, {
      as: "replies",
      foreignKey: "parentCommentId",
    });
    Comments.hasMany(models.LikeComments, {
      onDelete: "cascade",
    });
  };
  return Comments;
};
