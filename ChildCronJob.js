var log = require('./Entity/Log.js');
var redis = require('./Service/RedisService.js');
var sequelize = require('./Service/SequelizeService.js');
var config = require('./Common/Config.js');
var moment = require('moment');
let exitCount = 0;

process.on("message", (data) => {

    if(exitCount < config.limitCount){

        log.create(data.message).then(function(result) {

            exitCount++;
            //console.log("["+exitCount+"] INSERT COMPLETE KEY IS "+result._previousDataValues.messageId);
            //console.log(exitCount);
            process.send({"message" : result._previousDataValues.messageId});

        }).catch(function(error) {

            if(error.original != undefined && error.original.errno == 1062){

                redis.log.del(data.message.messageId).then((result) => {

                    if(result != 1){

                        console.log("[REDIS DELETE UNKNOWN ERROR IN DUPLICATE KEY ERROR]");
                        console.log("UNKNOWN ERROR IN DUPLICATE KEY ERROR RETURN VALUE : "+result);
                        console.log("[REDIS DELETE UNKNOWN ERROR IN DUPLICATE KEY ERROR TIME STAMP] "+moment().format("YYYY-MM-DD HH:mm:ss")+"\n");
                    }

                }).catch((error) => {

                      console.log("[REDIS DELETE ERROR IN DUPLICATE KEY ERROR]");
                      console.log(error);
                      console.log("[REDIS DELETE ERROR IN DUPLICATE KEY ERROR TIME STAMP] "+moment().format("YYYY-MM-DD HH:mm:ss")+"\n");
                });
            }
            else{

                    console.log("[MARIA INSERT ERROR]");
                    console.log(error);
                    //console.log(error.fields);
                    //console.log(error.original.code);
                    //console.log("ERROR CODE : " + error.original.errno);
                    console.log("[ERROR TIME STAMP] "+moment().format("YYYY-MM-DD HH:mm:ss")+"\n");
            }
        });
    }
    else{

        process.exit();
    }

});
