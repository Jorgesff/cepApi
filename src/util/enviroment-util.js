'use strict';
const util = require('util');


const getEnv = (env, defaultValue, required = true) => {
    if (!process.env[env] && required && !defaultValue) {
        throw Error(util.format('Variable %s is required!', env))
    }
    if (!process.env[env] && defaultValue) {
        return defaultValue
    }
    return process.env[env]
}

module.exports = { getEnv }