'use strict';

const {
    DataTypes
} = require('sequelize');

const sequelize = require('../config/database');

const Driver = require('./Driver')

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

        driver_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Driver,
                key: 'id'
            },
        }

    }
);

module.exports = Bus;