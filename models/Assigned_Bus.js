'use script';

const{
    DataTypes
} = require('sequelize');

const sequelize = require('../config/database')
const Bus = require('./Bus');
const Route = require('./Route');

const Assigned_Bus = sequelize.define(
    'assigned_buses', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },

        route_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: Route,
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

module.exports = Assigned_Bus;
