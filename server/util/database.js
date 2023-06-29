require("dotenv").config();
const { DATABASE_CONNECTION } = process.env;
const Sequelize = require("sequelize");

const sequelize = new Sequelize(DATABASE_CONNECTION, {
  dialect: "postgres", 
  dialectOptions: {
    ssl: {
    rejectUnauthorized: false
    }
    }
});

module.exports = {
  sequelize,
};
