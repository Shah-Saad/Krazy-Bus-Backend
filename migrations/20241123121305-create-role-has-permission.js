'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('role_has_permissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      
      role_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
              model: 'roles',
              key: 'id',
          },
      },

      permission_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
              model: 'permissions',
              key: 'id',
          },
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('role_has_permissions');
  }
};