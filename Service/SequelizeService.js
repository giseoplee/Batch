var Sequelize = require("sequelize");
var config = require('../Common/Config.js');

const sequelize = new Sequelize(config.storeConfig.mysqlDatabase,
                         config.storeConfig.mysqlUser,
                         config.storeConfig.mysqlPassword, {
    host : config.storeConfig.mysqlHost,
    dialect : config.storeConfig.storeDBMS,
    dialectOptions : {
      requestTimeout : 3000
    },
    port : config.storeConfig.mysqlPort,
    timezone : "+09:00",
    logging : false
});

module.exports = sequelize;
