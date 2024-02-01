const dbConfig = require('../dbconfig/dbConfig');
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('.');


module.exports = (sequelize,DataTypes)=>{
    const Request_type= sequelize.define('request_type',{
        idrequest_types:{ type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true,
            allowNull: false,
            unique: true},
        request_type: DataTypes.STRING,
    },
    {
        timestamps: false
    }
);
return Request_type;
}