const { BOOLEAN } = require("sequelize");
const { DataTypes } = require("sequelize");
const { sequelize, contract_status } = require(".");

module.exports = (sequelize,DataTypes)=>{
    const Employing_details = sequelize.define('employing_details',{
        idemploying_details :{ 
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true,
            allowNull: false,
            unique: true
        },
        worker_branch_id: {type:DataTypes.INTEGER,
            foreignkey:true},
        bank:DataTypes.STRING,
        branchnumber:DataTypes.INTEGER,
        bankaccount:DataTypes.INTEGER ,
        rank:DataTypes.INTEGER,//מעמד
        partiality:DataTypes.INTEGER,//חלקיות
        workingdays:DataTypes.INTEGER,
        startdate:DataTypes.DATE,
        enddate:DataTypes.DATE,
        rating:DataTypes.INTEGER,//דרוג
        degree:DataTypes.INTEGER,//דרגה
        roleid1:DataTypes.INTEGER,//1תפקיד
        roleid2:DataTypes.INTEGER,//2תפקיד
        roleid3:DataTypes.INTEGER,//3תפקיד
        hourrate:DataTypes.INTEGER,//תעריף לשעה
        workhours:DataTypes.INTEGER,
        contract_status_id:{type:DataTypes.INTEGER,
        foreignkey:true},
        // reference:contract_status,
        // referencekey:idcontract_status},
        employing_status:DataTypes.INTEGER,
            },
        {
            timestamps: false
        }
    );
    return Employing_details;
}