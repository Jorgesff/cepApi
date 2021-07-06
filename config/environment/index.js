'use strict';

const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

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
    viacep: {
        viaCepUrl: process.env.VIACEP_URL,
        viaCepTimeout: process.env.VIACEP_TIMEOUT
    },
    server: {
        routeTimout: process.env.ROUTE_TIMEOUT,
        host: process.env.API_HOST,
        port: process.env.API_PORT
    },
    auth: {
        secret: process.env.JWT_SECRET
    }
};

module.exports = envs;