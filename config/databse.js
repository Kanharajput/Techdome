// config/database.js
const Sequelize = require('sequelize');

const sequelize = new Sequelize('your_database_name', 'your_database_username', 'your_database_password', {
  host: 'your_database_host',
  dialect: 'mysql',
});

module.exports = sequelize;