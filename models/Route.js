'use script';

const {
    DataTypes
} = require('sequelize');
const sequelize = require('../config/database');

const Route = sequelize.define(
    'routes', {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },

        start_location: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        end_location: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        stops: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        departure_time: {
            type: DataTypes.TIME,
            allowNull: false,
        },

        arrival_time: {
            type: DataTypes.TIME,
            allowNull: false,
        },
    }
);

module.exports = Route;