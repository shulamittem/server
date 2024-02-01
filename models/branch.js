const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports=(sequelize,DataTypes)=>{
    const Branch = sequelize.define('branches' ,{
        idbranches:{
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        branch_name:{type:DataTypes.STRING,
           // allowNull: false
        },
        branch_city:DataTypes.STRING,
        branch_street:DataTypes.STRING,
        is_primary:DataTypes.INTEGER

    }, 
    {
        timestamps: false
    }
  )  // {
    // freezeTableName:true
    // };
   
    return Branch;
} 