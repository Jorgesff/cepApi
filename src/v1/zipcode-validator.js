'use strict'

const Joi = require("joi")

const zipcodeSchema = {
    query: Joi.object({
        zipcode: Joi
            .string()
            .regex(new RegExp("^[0-9]{8}$"))
            .required()
    }).allow('zipcode')
}
module.exports = { zipcodeSchema }