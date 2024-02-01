const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize,DataTypes)=>{
    const Active_requestes = sequelize.define('active_request',{
        idactive_request :{  type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true,
            allowNull: false,
            unique: true},
        userid: DataTypes.INTEGER,
        creationdate:DataTypes.DATE,
        worker_branchid:DataTypes.INTEGER,
        request_typeid:DataTypes.INTEGER,
        request_statusid:DataTypes.INTEGER,
        updatedate:DataTypes.DATE,
        description:DataTypes.STRING,
        contract_renewdate:DataTypes.DATE,
        day:DataTypes.INTEGER,
        fromhour:DataTypes.INTEGER,
        tohour:DataTypes.INTEGER
        // {}
            },
        {
            timestamps: false
        }
    );
    return Active_requestes;
}