var redis = require('./Service/RedisService.js');
var sequelize = require('./Service/SequelizeService.js');
var entityService = require('./Service/EntityService.js');
var log = require('./Entity/Log.js');
var moment = require('moment');
var rdbProcess = require('child_process').fork('./ChildCronJob.js');
let rdbProcessBytesRead = 0;
let exitFlag = 0;

entityService.Init();
console.log("[START TIME STAMP] "+moment().format("YYYY-MM-DD HH:mm:ss"));

rdbProcess.on("message", (data) => {

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

redis.logStream.on('data', (resultKeys, error) => {

    if(resultKeys.length == 0){

        rdbProcess._channel.bytesRead++;
    }

    for (let i = 0; i < resultKeys.length; i++) {

        redis.log.get(resultKeys[i]).then(function(result) {

            var jsonResult = JSON.parse(result);
            jsonResult.messageId = resultKeys[i];
            rdbProcess.send({"message" : jsonResult});
        });
    }
});

setInterval(() => {

      if(rdbProcess._channel.bytesRead != rdbProcessBytesRead){

          rdbProcessBytesRead = rdbProcess._channel.bytesRead;
      }
      else{

          if(exitFlag > 2){

              console.log("[END TIME STAMP] "+moment().format("YYYY-MM-DD HH:mm:ss"));
              sequelize.connectionManager.close();
              rdbProcess.kill("SIGINT");
              process.exit();
          }
          else{

              exitFlag++;
              console.log("EXIT FLAG COUNT : "+exitFlag);
          }
      }
}, 2000);
