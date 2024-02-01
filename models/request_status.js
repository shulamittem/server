const dbConfig = require('../dbconfig/dbConfig');
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('.');


module.exports = (sequelize,DataTypes)=>{
    const Request_status = sequelize.define('request_status',{
        idrequest_status:{ type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true,
            allowNull: false,
            unique: true},
            request_description: DataTypes.STRING,
    },
    {
        timestamps: false
    }
);
return Request_status;
}