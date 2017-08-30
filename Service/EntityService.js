var sequelize = require('./SequelizeService.js');
var log = require("../Entity/Log.js");

var EntityService = () => {};

EntityService.Init = () => {

    var result = log.sync().then( (result, error, callback) => {

        if(error) callback(result);
    });
}

module.exports = EntityService;
