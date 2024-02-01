const dbConfig = require('../dbconfig/dbConfig');
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('.');


module.exports = (sequelize,DataTypes)=>{
    const Traveling_rate= sequelize.define('traveling_rate',{
        idtraveling:{ type: DataTypes.INTEGER,
            primaryKey: true,
            // autoIncrement:true,
            allowNull: false,
            unique: true},
            traveling_name: DataTypes.STRING,
    },
    {
        timestamps: false
    }
);
return Traveling_rate;
}