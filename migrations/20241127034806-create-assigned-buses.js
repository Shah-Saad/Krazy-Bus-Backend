'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('assigned_buses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      route_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'routes',
            key: 'id',
        },
      },

      bus_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
              model: 'buses',
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
    await queryInterface.dropTable('assigned_buses');
  }
};