const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports=(sequelize,DataTypes)=>{  
    const Manager = sequelize.define('manager' ,{
        idmanager:{  type:DataTypes.INTEGER,
                primaryKey: true,
                //autoIncrement:true,
                allowNull: false,
                unique: true},
        manager_name:{type:DataTypes.STRING
            },

        officeid:DataTypes.INTEGER,
        M_N:DataTypes.INTEGER,
    },
    {
        timestamps: false
    });
    return Manager;
}