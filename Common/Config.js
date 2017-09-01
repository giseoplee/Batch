var fs = require("fs");

var _storeConfigDir = "/home/ubuntu/cron/Config/store.conf";
var _redisConfigDir = "/home/ubuntu/cron/Config/redis.conf";
// var _storeConfigDir = "C:/Users/LDCC/Desktop/제과챗봇/Batch/Config/store.conf";
// var _redisConfigDir = "C:/Users/LDCC/Desktop/제과챗봇/Batch/Config/redis.conf";
// var _storeConfigDir = "./Config/store.conf";
// var _redisConfigDir = "./Config/redis.conf";

var _storeConfigRaw = fs.readFileSync(_storeConfigDir, 'ascii');
var _storeConfig = JSON.parse(_storeConfigRaw);

var _redisConfigRaw = fs.readFileSync(_redisConfigDir, 'ascii');
var _redisConfig = JSON.parse(_redisConfigRaw);

exports.storeConfig = _storeConfig;
exports.redisConfig = _redisConfig;
