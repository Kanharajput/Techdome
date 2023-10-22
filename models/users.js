// models/user.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  isActive: DataTypes.BOOLEAN,
  role: DataTypes.STRING, // Add a 'role' field for user roles (e.g., 'User' or 'Admin')
});

module.exports = User;
