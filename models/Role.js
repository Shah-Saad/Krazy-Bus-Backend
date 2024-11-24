'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Role = sequelize.define(
  'roles', {
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
  });

module.exports = Role;
