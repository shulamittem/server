const dbConfig = require('../dbconfig/dbConfig');
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('.');


module.exports = (sequelize,DataTypes)=>{
    const Forms= sequelize.define('forms',{
        idforms:{ type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true,
            allowNull: false,
            unique: true},
            /////form
        from_discription: DataTypes.STRING,
        is_require:DataTypes.STRING,
        worker_branchid:DataTypes.INTEGER  
    },
    {
        timestamps: false
    }
);
return Forms;
}