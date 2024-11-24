'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('routes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      start_location: {
        type: Sequelize.STRING
      },
      end_location: {
        type: Sequelize.STRING
      },

        stops: {
          type: Sequelize.STRING,
          allowNull: false,
      },

      bus_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'buses',
            key: 'id'
        },
      },

      departure_time: {
          type: Sequelize.TIME,
          allowNull: false,
      },

      arrival_time: {
          type: Sequelize.TIME,
          allowNull: false,
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
    await queryInterface.dropTable('routes');
  }
};