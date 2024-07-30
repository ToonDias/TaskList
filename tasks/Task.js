const Sequelize = require("sequelize");
const Connection = require("../database/database");

Task = Connection.define('tasks', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    },
    responsavel: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

//Task.sync({force: true});

module.exports = Task;