'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Permission = sequelize.define(
  'permissions', {
      id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
      },
      name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
      },
  }
);

module.exports = Permission;
