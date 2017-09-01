var redis = require('./Service/RedisService.js');
var moment = require('moment');

console.log("[START TIME STAMP] "+moment().format("YYYY-MM-DD HH:mm:ss"));

redis.contextStream.on('data', (resultKeys, error) => {

    if(resultKeys.length == 0){

        console.log("[END TIME STAMP] "+moment().format("YYYY-MM-DD HH:mm:ss"));
        process.exit();
    }

    for(let i = 0; i < resultKeys.length; i++){

        console.log(resultKeys[i]);
        redis.context.get(resultKeys[i]).then((result) => {

            var currentTime = moment().valueOf()
            var jsonResult = JSON.parse(result);
            var expireTime = jsonResult.expires;

            console.log("expire time");
            console.log(moment(expireTime).format("YYYY-MM-DD HH:mm:ss"));
            console.log("current time");
            console.log(moment(currentTime).format("YYYY-MM-DD HH:mm:ss"));

            if(currentTime > expireTime){

                redis.context.del(resultKeys[i]).then((result) => {

                    if(result != 1){

                        console.log("[UNKNOWN SESSION DELETE ERROR]");
                        console.log(error);
                        console.log("[UNKNOWN SESSION DELETE ERROR] "+moment().format("YYYY-MM-DD HH:mm:ss")+"\n");
                    }

                    console.log(i);
                    console.log(resultKeys.length-1);
                    if(i == (resultKeys.length-1)){

                        console.log("[END TIME STAMP] "+moment().format("YYYY-MM-DD HH:mm:ss"));
                        process.exit();
                    }
                }).catch((error) => {

                    console.log("[SESSION DELETE ERROR]");
                    console.log(error);
                    console.log("[SESSION DELETE ERROR] "+moment().format("YYYY-MM-DD HH:mm:ss")+"\n");

                    if(i == (resultKeys.length-1)){

                        console.log("[END TIME STAMP] "+moment().format("YYYY-MM-DD HH:mm:ss"));
                        process.exit();
                    }
                });
            }
            else{

                if(i == (resultKeys.length-1)){

                    console.log("[END TIME STAMP] "+moment().format("YYYY-MM-DD HH:mm:ss"));
                    process.exit();
                }
            }
        }).catch((error) => {

            console.log("[GET SESSION TIME ERROR START]");
            console.log(error);
            console.log("[GET SESSION TIME ERROR TIME STAMP] "+moment().format("YYYY-MM-DD HH:mm:ss"));

            if(i == (resultKeys.length-1)){

                console.log("[END TIME STAMP] "+moment().format("YYYY-MM-DD HH:mm:ss"));
                process.exit();
            }
        });
    }
});
