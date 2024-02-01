const dbConfig = require('../dbconfig/dbConfig');
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('.');


module.exports = (sequelize,DataTypes)=>{
    const Contract_status= sequelize.define('contract_status',{
        contract_status_id:{ type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true,
            allowNull: false,
            primaryKey: true,
            unique: true},
        contract_description: DataTypes.STRING,
    },
    {
        timestamps: false
    }
);
return Contract_status;
}