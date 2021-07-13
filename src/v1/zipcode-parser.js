'use strict';

const util = require('util');

/**
 * 
 * @param {any} response 
 * @param {any} options 
 * @param {boolean} cached 
 * @returns any
 */
const buildResponse = (response, options, cached = false) => {
    options.endPoint('api');
    return {
        meta: {
            latency: {
                api: util.format('%dms', options.getLatency('api')),
                cache: util.format('%dms', options.getLatency('redis')),
                service: util.format('%dms', options.getLatency('service'))
            },
            origin: {
                cache: cached
            }
        },
        data: response
    };
}
module.exports = { buildResponse };