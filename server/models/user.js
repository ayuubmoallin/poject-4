const { DataTypes } = require("sequelize");

const { sequelize } = require("../util/database");
const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: DataTypes.STRING,
  hashedPass: DataTypes.STRING,
});

module.exports = User;
