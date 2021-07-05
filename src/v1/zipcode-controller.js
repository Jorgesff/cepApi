'use strict';

const HttpStatus = require('http-status');
const { zipcodeBusiness } = require("./zipcode-business");


const controller = async (request, h) => {
    try {
        const business = await zipcodeBusiness(request)
        return h.response(business.data).code(HttpStatus.OK);

    } catch (error) {
       return h.response({message: error.message}).code(error.statusCode)
    }
}

module.exports = { controller }