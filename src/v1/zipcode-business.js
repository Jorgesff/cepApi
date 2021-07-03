'use strict';

const { getZipcode } = require("./service/viaCep");

const zipcodeBusiness = async (options) => {
    
    try {
        const response = await getZipcode(options.query.zipcode, options.query.format);
        return response.data;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    zipcodeBusiness
}