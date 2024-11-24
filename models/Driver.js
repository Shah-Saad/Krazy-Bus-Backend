'use strict';

const {
    DataTypes
} = require('sequelize');

const sequelize = require('../config/database');
const Bus = require('./Bus')

const Driver = sequelize.define(
    'drivers', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        contact: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }

    }
);

module.exports = Driver;
