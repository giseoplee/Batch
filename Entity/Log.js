var sequelize = require('sequelize');
var dbService = require('../Service/SequelizeService.js');

const Log = dbService.define('log', {

    id: { type: sequelize.INTEGER(11), primaryKey: true, autoIncrement: true },
    messageId : {type : sequelize.CHAR(36), allowNull : false, unique: true},
    userId : { type : sequelize.CHAR(12), allowNull : false },
    intent : { type : sequelize.STRING(50), allowNull : true },
    confidence : { type : sequelize.DOUBLE, allowNull : true },
    entityLabelA : { type : sequelize.STRING(50), allowNull : true },
    entityValueA : { type : sequelize.STRING(300), allowNull : true },
    entityLabelB : { type : sequelize.STRING(50), allowNull : true },
    entityValueB : { type : sequelize.STRING(300), allowNull : true },
    entityLabelC : { type : sequelize.STRING(50), allowNull : true },
    entityValueC : { type : sequelize.STRING(300), allowNull : true },
    userMessage : { type : sequelize.STRING(300), allowNull : true },
    botMessage : { type : sequelize.STRING(500), allowNull : true },
    conversationId : { type : sequelize.CHAR(36), allowNull : true },
    nodeVisited : { type : sequelize.STRING(300), allowNull : true },
    nodeVisitedId : { type : sequelize.STRING(20), allowNull : true },
    age : { type : sequelize.STRING(20), allowNull : true },
    name : { type : sequelize.STRING(20), allowNull : true },
    logLevel : { type : sequelize.STRING(50), allowNull : true },
    logMessage : { type : sequelize.TEXT, allowNull : true },
    dialogueCount : { type : sequelize.INTEGER(11), allowNull : true },
    createdAt : { type : sequelize.DATE, allowNull : true }
},
{
    indexes : [{

        unique : true,
        fields : [ 'messageId' ]
    }]
},
{
    engine : "ARCHIVE",
    charset : "utf8",
    collate : "utf8_general_ci",
    timestamps: false
});

module.exports = Log;
