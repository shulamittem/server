const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports=(sequelize,DataTypes)=>{  
    const User = sequelize.define('users' ,{
        idusers:{  type:DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement:true,
                allowNull: false,
                unique: true},
        idnumber:{type:DataTypes.INTEGER,
           allowNull: false,
           //defualtValue: aaa,//
            unique: true},
        name:{type:DataTypes.STRING
            },
        city:DataTypes.STRING,
        street:DataTypes.STRING,
        email:DataTypes.STRING,
        phone:DataTypes.INTEGER,
        user_accessid:DataTypes.INTEGER,
        password:DataTypes.STRING,
        branchid:DataTypes.INTEGER
    },
    {
        timestamps: false
    });
    return User;
}