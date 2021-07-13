'use strict';

const bunyan = require('bunyan');
const envs = require('../environment');
const logger = bunyan.createLogger({
    name: 'cepAPI',
    stream: process.stdout,
    level: 'trace',
    environment: envs.env
})

logger.on('error', () => {
    console.log('Erro ao logar')
})
module.exports = {
    logger
}