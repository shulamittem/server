const dbConfig = require('../dbconfig/dbConfig');
const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
}
   ) 

   
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.active_request = require('./active_request')(sequelize, DataTypes);
db.branch = require('./branch')(sequelize, DataTypes);
 db.contract_status = require('./contract_status')(sequelize, DataTypes);
// db.day = require('./days')(sequelize, DataTypes);
db.employing_days = require('./employing_days')(sequelize, DataTypes);
db.employing_details = require('./employing_details')(sequelize, DataTypes);
db.forms = require('./forms')(sequelize, DataTypes);
db.contract_status = require('./contract_status')(sequelize, DataTypes);
db.manager = require('./manager')(sequelize, DataTypes);
db.office = require('./office')(sequelize, DataTypes);
db.request_status = require('./request_status')(sequelize, DataTypes);
db.request_type = require('./request_type')(sequelize, DataTypes);
db.role = require('./role')(sequelize, DataTypes);
db.traveling_rate = require('./traveling_rate')(sequelize, DataTypes);
db.user_access = require('./user_access')(sequelize, DataTypes);
db.user = require('./user')(sequelize, DataTypes);
db.worker_branch = require('./worker_branch')(sequelize, DataTypes);
db.worker = require('./worker')(sequelize, DataTypes);



//foreignKeys
db.employing_details.belongsTo(db.role, {foreignKey:'roleid1', as: 'role1'});
db.employing_details.belongsTo(db.role, {foreignKey:'roleid2',as: 'role2'});
db.employing_details.belongsTo(db.role, {foreignKey:'roleid3',as: 'role3'});
db.employing_details.belongsTo(db.contract_status,{foreignKey:'contract_status_id'});
db.worker_branch.belongsTo(db.worker, { foreignKey:'workerid'});
db.worker_branch.belongsTo(db.branch, { foreignKey:'branchid'});
db.employing_details.belongsTo(db.worker_branch, { foreignKey:'worker_branch_id'});
//db.worker_branch.hasMany(db.employing_details,{ foreignKey:'worker_branch_id'})

db.active_request.belongsTo(db.worker_branch, { foreignKey:'worker_branchid'});
db.worker_branch.hasMany(db.active_request, {foreignKey:'worker_branchid'});
db.active_request.belongsTo(db.request_status, {foreignKey:'request_statusid'});
db.active_request.belongsTo(db.request_type, {foreignKey:'request_typeid'});
db.employing_days.belongsTo(db.employing_details, {foreignKey:'idemploying_details'});
db.employing_details.hasMany(db.employing_days,{foreignKey:'idemploying_details'});


db.sequelize.sync({ force: false })
    .then(() => {
        console.log('!yes re-sync done!')
    }) 
module.exports = db
