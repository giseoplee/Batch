var redis = require('./Service/RedisService.js');
var sequelize = require('./Service/SequelizeService.js');
var entityService = require('./Service/EntityService.js');
var log = require('./Entity/Log.js');
var moment = require('moment');
var child = require('child_process').fork('ChildCronJob.js');
let bytesRead = 0;
let exitFlag = 0;

entityService.Init();
console.log("[START TIME STAMP] "+moment().format("YYYY-MM-DD HH:mm:ss"));

child.on("message", (data) => {

    redis.log.del(data.message).then((result) => {

        if(result != 1){

            console.log("[REDIS DELETE UNKNOWN ERROR]");
            console.log("REDIS RETURN VALUE : "+result);
            console.log("[UNKNOWN ERROR TIME STAMP] "+moment().format("YYYY-MM-DD HH:mm:ss")+"\n");
        }

    }).catch((error) => {

          console.log("[REDIS DELETE ERROR]");
          console.log(error);
          console.log("[ERROR TIME STAMP] "+moment().format("YYYY-MM-DD HH:mm:ss")+"\n");
    });
});

redis.stream.on('data', (resultKeys, error) => {

    if(resultKeys.length == 0){

        child._channel.bytesRead++;
    }

    for (let i = 0; i < resultKeys.length; i++) {

        redis.log.get(resultKeys[i]).then(function(result) {

            var jsonResult = JSON.parse(result);
            jsonResult.messageId = resultKeys[i];
            child.send({"message" : jsonResult});
        });
    }
});

setInterval(() => {

    if(child._channel.bytesRead != bytesRead){

        bytesRead = child._channel.bytesRead;
    }
    else{

        if(exitFlag > 3){

            console.log("[END TIME STAMP] "+moment().format("YYYY-MM-DD HH:mm:ss"));
            sequelize.connectionManager.close();
            child.kill("SIGINT");
            process.exit();
        }
        else{

            exitFlag++;
            console.log("EXIT FLAG COUNT : "+exitFlag);
        }
    }
}, 5000);
