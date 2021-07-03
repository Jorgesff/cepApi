'use strict';

const bunyan = require('bunyan')
const logger = bunyan.createLogger({ name: 'cepAPI' })

logger.on('error', () => {
    console.log('Erro ao logar')
})

module.exports = {
    logger
}