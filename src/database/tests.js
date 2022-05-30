const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('bookstore', 'user', 'password', {
    dialect: 'sqlite',
    host: './test.sqlite'
});

module.exports = sequelize