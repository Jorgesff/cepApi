'use strict'

const Joi = require("joi");

const zipcodeSchema = {
    query: Joi.object({
        zipcode: Joi
            .string()
            .regex(new RegExp("^[0-9]{8}$"))
            .required()
    }).allow('zipcode')
}

const healthSchema = {
    query: Joi.object({}).allow()
}
module.exports = { zipcodeSchema, healthSchema }