const { DataTypes } = require("sequelize");
const connection = require("../database/connection");


const Permissao = connection.define('Permissao', {
    description: DataTypes.STRING
});

module.exports = Permissao;