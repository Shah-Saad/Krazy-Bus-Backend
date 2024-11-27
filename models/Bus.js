'use strict';

const {
    DataTypes
} = require('sequelize');

const sequelize = require('../config/database');

const Bus = sequelize.define(
    'buses', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        capacity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

    }
);

module.exports = Bus;