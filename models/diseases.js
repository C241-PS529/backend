const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Diseases = sequelize.define('Diseases', {
  id_diseases: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  detail: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  timestamps: false,
});

module.exports = Diseases;
