'use strict';

const { getZipcode } = require("./service/viaCep");
const _ = require('lodash');
const HttpStatus = require('http-status');
const BusinessError = require("./zipcode-exception");

const zipcodeBusiness = async (options) => {

    try {
        let zipcodeFounded;
        let zipcodeToBeTested = options.query.zipcode;
        for (let index = 0; index < zipcodeToBeTested.length; index++) {
            if (index > 0) {
                const x = zipcodeToBeTested.length - index;
                const subZipcode = zipcodeToBeTested.slice(0, x)
                zipcodeToBeTested = _.padEnd(subZipcode, 8, '0');
            }
            const response = await getZipcode(zipcodeToBeTested);
            if (!response.data.erro) {
                zipcodeFounded = response;
                index = zipcodeToBeTested.length;
            }
        }
        if (!zipcodeFounded) {
            throw new BusinessError({
                message: "Não foi encontrado nenhum cep igual ou similar, por favor tente outro!",
                statusCode: HttpStatus.NOT_FOUND
            })
        }
        return zipcodeFounded;
    } catch (error) {
        if (error.statusCode != HttpStatus.NOT_FOUND) {
            throw new BusinessError({
                message: error.message,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR
            })
        }
        throw error
    }
}

module.exports = {
    zipcodeBusiness
}