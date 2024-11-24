'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Role = require('./Role');
const Permission = require('./Permission');

const RoleHasPermission = sequelize.define(
  'role_has_permissions', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Role,
            key: 'id',
        },
    },
    permission_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Permission,
            key: 'id',
        },
    },
});

module.exports = RoleHasPermission;
