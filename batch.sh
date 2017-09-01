#!/bin/bash

timestamp=$(date +%Y%m%d_%H%M)
saveDirectory=$(date +%Y%m%d)
if [ ! -d /home/ubuntu/cron/Log/log/$saveDirectory ]
then
    mkdir /home/ubuntu/cron/Log/log/$saveDirectory
fi

if [ ! -d /home/ubuntu/cron/Log/session/$saveDirectory ]
then
     mkdir /home/ubuntu/cron/Log/session/$saveDirectory
fi

/usr/bin/node /home/ubuntu/cron/MainCronJob.js > /home/ubuntu/cron/Log/log/$saveDirectory/bot_$timestamp.log 2>&1
/usr/bin/node /home/ubuntu/cron/SessionCronJob.js > /home/ubuntu/cron/Log/session/$saveDirectory/session_$timestamp.log 2>&1
