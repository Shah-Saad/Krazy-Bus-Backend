'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('assigned_drivers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      driver_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'drivers',
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
    await queryInterface.dropTable('Assigned_Drivers');
  }
};