const dbConfig = require('../dbconfig/dbConfig');
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('.');


module.exports = (sequelize,DataTypes)=>{
    const Worker_branch= sequelize.define('worker_branch',{
        id:{ type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique: true},
        workerid: DataTypes.INTEGER,
        branchid:DataTypes.INTEGER,        
    },
    {
        timestamps: false
    }
);
return Worker_branch;
}