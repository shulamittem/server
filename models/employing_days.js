const dbConfig = require('../dbconfig/dbConfig');
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('.');
//const {employing_details} = require(".");

module.exports = (sequelize,DataTypes)=>{
    const Employing_days= sequelize.define('employing_days',{
        idemploying_days:{ type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true,
            allowNull: false,
            unique: true},
        day: DataTypes.STRING,
        fromhour:DataTypes.INTEGER,
        tohour:DataTypes.INTEGER,
        idemploying_details:{
            type:DataTypes.INTEGER,
            // references: employing_details,
            // referenceskey: idemploying_details
        }
    },
    {
        timestamps: false
    }
);
return Employing_days;
}

