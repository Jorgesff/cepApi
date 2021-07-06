'use strict';

const HttpStatus = require('http-status');
const { logger } = require('../../config/log-manager');
const { zipcodeBusiness } = require("./zipcode-business");


const controller = async (request, h) => {
    try {
        const business = await zipcodeBusiness(request)
        logger.info(business.data)
        return h.response(business.data).code(HttpStatus.OK);

    } catch (error) {
        logger.error(error);
        return h.response(error).code(error.statusCode)
    }
}
const healthController = async (request, h) => {
    try {
        return h.response({ status: 'pong' }).code(HttpStatus.OK)
    } catch (error) {
        return h.response(error).code(error.statusCode)
    }
}

module.exports = { controller, healthController }