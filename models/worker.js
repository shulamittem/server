const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports=(sequelize,DataTypes)=>{  
    const Worker = sequelize.define('worker' ,{
        idworker:{  type:DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement:true,
                allowNull: false,
                unique: true},
        idnumberWorker:{type:DataTypes.INTEGER,
        //    allowNull: false,
            unique: true},
        anotherid:{type:DataTypes.STRING
            },
        firstName:DataTypes.STRING,
        lastName:DataTypes.STRING,
        birthdata:DataTypes.DATE,
        fatherName:DataTypes.STRING,
        familySituation:DataTypes.STRING,
        idspouse:DataTypes.INTEGER,
        namespouse:DataTypes.STRING,
        birthdataspouse:DataTypes.DATE,
        spouseWork:DataTypes.STRING,
        LocalityCode:DataTypes.STRING,
        streetWorker:DataTypes.STRING,
        numHome:DataTypes.INTEGER,
        apartment:DataTypes.INTEGER,
        Mailbox:DataTypes.STRING,

    },
    {
        timestamps: false
    });
    return Worker;
}