const winston = require('winston');
const { env, logFilePath } = require('./app');

const transports = [
    env === 'dev' ?
        new winston.transports.Console() :
        new winston.transports.File({ filePath: logFilePath }),
];

module.exports = new (winston.Logger)({ transports });
