'use script';

const{
    DataTypes
} = require('sequelize');
const sequelize = require('../config/database')
const User = require('./User');
const Bus = require('./Bus');

const Booking = sequelize.define(
    'bookings', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },

        bus_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Bus,
                key: 'id',
            },
        },
        
        user_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            },
        }
    }
);

module.exports = Booking;
