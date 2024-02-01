const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports=(sequelize,DataTypes)=>{  
    const Role = sequelize.define('role' ,{
        idrole:{  type:DataTypes.INTEGER,
                primaryKey: true,
                // autoIncrement:true,
                allowNull: false,
                unique: true},
        role_name:{type:DataTypes.STRING,
        allowNull: false,
           //defualtValue: aaa,//
        unique: true},
 
    },
    {
        timestamps: false
    });
    return Role;
}