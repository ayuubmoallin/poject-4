const { DataTypes } = require("sequelize");

const { sequelize } = require("../util/database");

const Post = sequelize.define("Post", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
  },
  content: {
    type: DataTypes.TEXT,
  },
  privateStatus: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Post;
