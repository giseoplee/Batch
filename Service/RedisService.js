"use strict"

var ioRedis = require('ioredis');
var util = require('util');
var config = require('../Common/Config.js');

var RedisService = () => {};

var contextCache = new ioRedis(
{
      port: config.redisConfig.redisPort,
      host: config.redisConfig.redisHost,
      password: config.redisConfig.redisPassword,
      db: 0,

      retryStrategy: (times) => {
          var delay = Math.min(times * 2, 2000);
          console.log(delay);
          return delay;
      }
});

var logCache = new ioRedis(
{
    port: config.redisConfig.redisPort,
    host: config.redisConfig.redisHost,
    password: config.redisConfig.redisPassword,
    db: 1,

    retryStrategy: (times) => {
        var delay = Math.min(times * 2, 2000);
        console.log(delay);
        return delay;
    }
});

RedisService.context = contextCache;
RedisService.log = logCache;
RedisService.stream = logCache.scanStream({

    count : 10
});

module.exports = RedisService;
