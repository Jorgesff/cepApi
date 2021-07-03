'use strict';

const Hapi = require('@hapi/hapi');
const Hapiswagger = require('hapi-swagger');
const configuration = require('./environment')
const AuthJWT = require('hapi-auth-jwt2')
const { logger } = require('./log-manager');
const Routes = require('../src/v1/zipcode-routes');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const { version } = require('joi');

const server = Hapi.server({
  host: configuration.server.host,
  port: configuration.server.port,
  routes: {
    cors: false,
    validate: {
      options: {
        abortEarly: false
      },
      failAction: (request, h, err) => {
        throw err;
      }
    },
    timeout: {
      server: configuration.server.routeTimout
    }
  }
});


const plugins = [
  {
    plugin: Inert
  },
  {
    plugin: Vision
  },
  {
    plugin: Hapiswagger,
    options: {
      info: {
        title: 'API Documentation',
        version: '1.0.0'
      }
    }
  }
]

const validate = async (decode, request, h) => {
  if (decode) {
    return { isValid: true }
  }
}

const init = async () => {
  try {
    plugins.push(Routes)
    plugins.push(AuthJWT)
    await server.register(plugins)
    server.auth.strategy('jwt', 'jwt', {
      key: configuration.auth.secret,
      validate
    })
    server.auth.default('jwt')
    await server.start()
    console.log("Server is running on port " + configuration.server.port)
  } catch (error) {
    logger.info({ err: error })
  }
}
init();
module.exports = { server }