const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'gestion_salud_eps',
    'root',
    'admin',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

module.exports = sequelize;