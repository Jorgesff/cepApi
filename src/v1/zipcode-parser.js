'use strict';

const util = require('util');

const buildResponse = (response, options) => {
    options.endPoint('api');
    return {
        meta: {
            latency: {
                api: util.format('%dms', options.getLatency('api')),
                cache: util.format('%dms', options.getLatency('redis')),
                service: util.format('%dms', options.getLatency('service'))
            }
        },
        data: response
    };
}
module.exports = { buildResponse };