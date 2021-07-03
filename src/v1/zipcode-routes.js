'use strict';

const Controller = require("./zipcode-controller");
const { zipcodeSchema } = require("./zipcode-validator");

const plugin = {
    name: 'zipcode-v1',
    register: (server) => {
        server.route([{
            method: 'GET',
            path: '/zipcode',
            options: {
                handler: Controller.controller,
                tags: ['api'],
                description: "GET de ceps",
                notes: "Rota para busca de ceps",
                validate: zipcodeSchema
            }
        }])
    }

}
module.exports = plugin