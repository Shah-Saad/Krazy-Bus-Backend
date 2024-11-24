const {Sequelize} = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: '',
    database: 'krazy_bus_db',
    port: 3306,
})

module.exports = sequelize;