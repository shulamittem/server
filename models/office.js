const dbConfig = require('../dbconfig/dbConfig');
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('.');


module.exports = (sequelize,DataTypes)=>{
    const Office = sequelize.define('office',{
        idoffice:{ type: DataTypes.INTEGER,
            primaryKey: true,
            //autoIncrement:true,
            allowNull: false,
            unique: true},
            officename: DataTypes.STRING,
            office_status:DataTypes.BOOLEAN,
    },
    {
        timestamps: false
    }
);
return  Office;
}