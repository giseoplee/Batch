var log = require('./Entity/Log.js');
var redis = require('./Service/RedisService.js');
var sequelize = require('./Service/SequelizeService.js');
var moment = require('moment');

process.on("message", (data) => {

    log.create(data.message).then(function(result) {

        process.send({"message" : result._previousDataValues.messageId});

    }).catch(function(error) {

        console.log(error);
        if(error.original.errno == 1062){

            redis.log.del(data.message.messageId).then((result) => {

                if(result != 1){

                    console.log("[REDIS DELETE UNKNOWN ERROR IN DUPLICATE KEY ERROR]");
                    console.log(result);
                    console.log("[REDIS DELETE UNKNOWN ERROR IN DUPLICATE KEY ERROR TIME STAMP] "+moment().format("YYYY-MM-DD HH:mm:ss")+"\n");
                }

            }).catch((error) => {

                  console.log("[REDIS DELETE ERROR IN DUPLICATE KEY ERROR]");
                  console.log(error);
                  console.log("[REDIS DELETE ERROR IN DUPLICATE KEY ERROR TIME STAMP] "+moment().format("YYYY-MM-DD HH:mm:ss")+"\n");
            });
        }
        else{

            if(error.original.code == "PROTOCOL_CONNECTION_LOST"){

            }
            else{

                console.log("[MARIA INSERT ERROR]");
                console.log(error.fields);
                console.log(error.original.code);
                console.log("ERROR CODE : " + error.original.errno);
                console.log("[ERROR TIME STAMP] "+moment().format("YYYY-MM-DD HH:mm:ss")+"\n");
            }

        }
    });
});
