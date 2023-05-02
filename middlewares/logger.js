const winston = require('winston');
const expressWinston = require('express-winston');
require('winston-mongodb');
require('dotenv').config();

const logger = expressWinston.logger({
    transports: [
        new winston.transports.MongoDB({
            level: 'error',
            json: true,
            collection: 'errors',
            db: process.env.mongourl
        })
    ],
});

module.exports = { logger };