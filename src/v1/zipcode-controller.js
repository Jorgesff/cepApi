'use strict';

const HttpStatus = require('http-status');
const { logger } = require('../../config/log-manager');
const { zipcodeBusiness } = require("./zipcode-business");


/**
 * 
 * @param {*} request 
 * @param {*} h 
 * @returns any
 */
const controller = async (request, h) => {
    try {
        const business = await zipcodeBusiness(request);
        return h.response(business).code(HttpStatus.OK);

    } catch (error) {
        logger.error(error);
        return h.response(error).code(error.statusCode);
    }
}

/**
 * 
 * @param {*} request 
 * @param {*} h 
 * @returns any
 */
const healthController = async (request, h) => {
    try {
        return h.response({ status: 'pong' }).code(HttpStatus.OK);
    } catch (error) {
        return h.response(error).code(error.statusCode);
    }
}

module.exports = { controller, healthController }