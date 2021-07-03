'use strict';

const Axios = require('axios').default;
const Configuration = require('../../../config/environment');
const util = require('util');

const getZipcode = async (zipcode) => {
    const url = util.format('%s/%s/%s', Configuration.viacep.viaCepUrl, zipcode, 'json');
    const response = await Axios.get(url, {
        timeout: parseInt(Configuration.viacep.viaCepTimeout)
    });
    return response;
}

module.exports = { getZipcode };