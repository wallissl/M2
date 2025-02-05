const {Sequelize} = require('sequelize'); // ORM
const databaseConfig = require('../config/database.config');
const connection = new Sequelize(databaseConfig)

module.exports = connection;
