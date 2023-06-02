const log4js = require('log4js');

const LOG_PATH = './logs';
const LOG_NAME = 'server.log';

log4js.configure({
    appenders: {
        console: {type: 'stdout'},
        file: {type: 'file', filename: `${LOG_PATH}/${LOG_NAME}`}
    }, categories: {
        default: {appenders: ['console', 'file'], level: 'debug'}
    }
});

module.exports = log4js.getLogger('file');