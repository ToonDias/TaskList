const Sequelize = require("sequelize");
const {user, password} = require("./db-date");

const Connection = new Sequelize("tasks", user , password, {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = Connection;