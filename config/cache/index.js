'use strict';

const NodeCache = require('node-cache')
const configuration = require('../environment');

let cache = null
exports.start = () => {
    if (cache) {
        return
    }
    cache = new NodeCache({ stdTTL: configuration.cache.ttl })
}
exports.get = (key) => {
    return cache.get(key);
}

exports.set = (key, value) => {
    return cache.set(key, value)
}