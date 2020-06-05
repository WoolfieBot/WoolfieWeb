const Sequelize = require('sequelize');

const sequelize = new Sequelize('bot', 'root', '',{
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    define: {
        timestamps: false
    }
})

module.exports = sequelize;