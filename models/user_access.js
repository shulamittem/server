const dbConfig = require('../dbconfig/dbConfig');
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('.');


module.exports = (sequelize,DataTypes)=>{
    const User_access = sequelize.define('user_access',{
        iduser_types:{ type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true,
            allowNull: false,
            unique: true},
        role_possition: DataTypes.STRING,
    },
    {
        timestamps: false
    }
);
return User_access;
}