'use strict';

const {
    DataTypes
} = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define(
    'users', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,

        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        role_id: {
            type: DataTypes.BOOLEAN
        },

    }


);

module.exports = User;

