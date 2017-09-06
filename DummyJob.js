var redis = require('./Service/RedisService.js');
//var config = require('./Common/Config.js');
var uuidv4 = require('uuid/v4');
var moment = require('moment');
var primaryKey;
var dummy = {
  "userId": "HH5Jiv90IFMh",
  "userMessage": "지에스",
  "botMessage": "지에스 님은 직딩이야? 아님 대딩? 중고딩? 초딩? 꽃중년? 자유인?",
  "conversationId": "ffea3c71-077e-4630-b6bb-e9e60ded3191",
  "nodeVisited": "0.1.2 이름",
  "nodeVisitedId": "node_15_1500367660442",
  "name": "지에스",
  "dialogueCount": 2,
  "createdAt": moment().format("YYYY-MM-DD HH:mm:ss")
}

for(let i = 0; i < 110000; i++){

    primaryKey = uuidv4();
    redis.log.set(primaryKey, JSON.stringify(dummy)).then().catch((error) => {

        console.log(JSON.stringify(error));
    });
}
