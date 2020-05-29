const Model = require("sequelize").Model;
const DataTypes = require('sequelize');
const sequelize = require("../database/db");

class Users extends Model {}

Users.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: true
    },
    userID:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    accesToken:{
        type: DataTypes.STRING,
        allowNull: false
    },
    refreshToken:{
        type: DataTypes.STRING,
        allowNull: true
    },
    username:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    userAvatarUrl:{
        type: DataTypes.TEXT,
        allowNull: true
    },
    guilds:{
        type: DataTypes.TEXT,
        allowNull: true
    }
},{
    sequelize: sequelize,
    modelName: 'users',
    freezeTableName: true
})

module.exports = Users;