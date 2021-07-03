'use strict';

const HttpStatus = require('http-status');
const { zipcodeBusiness } = require("./zipcode-business");


const controller = async (request, h) => {
    try {
        const business = await zipcodeBusiness(request)
        return h.response(business).code(HttpStatus.OK);

    } catch (error) {
       h.response(error).code(error.status_code)
    }
}

module.exports = { controller }