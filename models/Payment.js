'use script';

const{
    DataTypes
} = require('sequelize');
const sequelize = require('../config/database');
const Booking = require('./Booking')
const User = require('./User')

const Payment = sequelize.define(
    'payments', {
        booking_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Booking,
                key: 'id'
            },
        },

        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
              model: User,
              key: 'id'
          },
        },

        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    }
);

module.exports = Payment;