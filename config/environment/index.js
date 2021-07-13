'use strict';

const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const envUtil = require('../../src/util/enviroment-util')

const initEnvVariables = () => {
    // Set default node environment to development
    process.env.NODE_ENV = process.env.NODE_ENV || 'development';
  
    const envPath = process.env.NODE_ENV === 'test' ? path.join(__dirname, '/../../test/.env') : path.join(__dirname, '/../../.env-' + process.env.NODE_ENV);
  
    try {
      fs.statSync(envPath);
      dotenv.config({ path: envPath });
    } catch (err) { console.log(envPath + ' not found, load by environment variables'); }
};
initEnvVariables()

const envs = {
    env: envUtil.getEnv('NODE_ENV', 'development'),
    viacep: {
        viaCepUrl: envUtil.getEnv('VIACEP_URL', ''),
        viaCepTimeout: envUtil.getEnv('VIACEP_TIMEOUT', '')
    },
    server: {
        routeTimout: envUtil.getEnv('ROUTE_TIMEOUT',1000),
        host: envUtil.getEnv('API_HOST', 'localhost'),
        port: envUtil.getEnv('API_PORT', '3000')
    },
    cache: {
        ttl: envUtil.getEnv('CACHE_TTL', 30),
        key: envUtil.getEnv('CACHE_KEY', 'zipcode', true)
    },
    auth: {
        secret: envUtil.getEnv('JWT_SECRET', '')
    }
};

module.exports = envs;