'use strict';

const Controller = require("./zipcode-controller");
const { zipcodeSchema, healthSchema } = require("./zipcode-validator");

const plugin = {
    name: 'zipcode-v1',
    register: (server) => {
        server.route([
            {
                method: 'GET',
                path: '/zipcode',
                options: {
                    handler: Controller.controller,
                    tags: ['api'],
                    description: "GET de ceps",
                    notes: "Rota para busca de ceps",
                    validate: zipcodeSchema
                }
            },
            {
                method: 'GET',
                path: '/ping',
                options: {
                    handler: Controller.healthController,
                    tags: ['api'],
                    description: "GET health status",
                    notes: "Rota para verificar se o serviço esta online",
                    validate: healthSchema
                }
            }

        ])
    }

}
module.exports = plugin