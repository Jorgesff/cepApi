'use strict';

const NodeCache = require('node-cache')
const configuration = require('../environment');

let cache = null
exports.start = () => {
    if (cache) {
        return
    }
    if (configuration.cache.enabled) {
        cache = new NodeCache({ stdTTL: configuration.cache.ttl })
    }
}
exports.get = (key) => {
    if (cache) {
        return cache.get(key);
    }
}

exports.set = (key, value) => {
    if (cache) {
        return cache.set(key, value)
    }
}

exports.flush = () => {
    if (cache) {
        cache.flushAll();
    }
}