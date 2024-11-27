'use script';

const{
    DataTypes
} = require('sequelize');

const sequelize = require('../config/database')
const Bus = require('./Bus');
const Driver = require('./Driver');

const Assigned_Driver = sequelize.define(
    'assigned_drivers', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },

        driver_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: Driver,
              key: 'id',
          },
        },

        bus_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Bus,
                key: 'id',
            },
        },
        
    }
);

module.exports = Assigned_Driver;
