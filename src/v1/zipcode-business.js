'use strict';

const { getZipcode } = require("./service/viaCep");
const _ = require('lodash');
const util = require('util');
const HttpStatus = require('http-status');
const BusinessError = require("./zipcode-exception");
const { logger } = require("../../config/log-manager");
const envs = require("../../config/environment");
const cache = require('../../config/cache');
const latencyMarker = require('../util/latency-util');
const { buildResponse } = require('./zipcode-parser')

/**
 * 
 * @param {{header: any, query: any, params: any}} options 
 * @returns string
 */
const zipcodeBusiness = async (options) => {
    // Markers para medição de performance segmentada
    latencyMarker.initLatency('redis');
    latencyMarker.initLatency('service');
    latencyMarker.initLatency('api');

    try {
        latencyMarker.startPoint('api');
        let zipcodeToBeTested = options.query.zipcode;
        const key = util.format('%s-%s', envs.cache.key, zipcodeToBeTested);
        latencyMarker.startPoint('redis');

        // consulta se existe cep em cache
        const zipcodeFounded = cache.get(key);
        latencyMarker.endPoint('redis');
        if (!zipcodeFounded) {
            return getZipcodeFromService(zipcodeToBeTested, latencyMarker, key);
        }
        
        return buildResponse(zipcodeFounded, latencyMarker);
    } catch (error) {
        if (error.statusCode != HttpStatus.NOT_FOUND) {
            throw new BusinessError({
                message: error.message,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Internal Server Error'
            });
        }
        throw error;
    }
}

/**
 * 
 * @param {string} zipcodeToBeTested 
 * @param {*} latencyMarker 
 * @param {string} key 
 * @returns any
 */
const getZipcodeFromService = async (zipcodeToBeTested, latencyMarker, key) => {
    for (let index = 0; index < zipcodeToBeTested.length; index++) {
        if (index > 0) {
            const x = zipcodeToBeTested.length - index;
            const subZipcode = zipcodeToBeTested.slice(0, x);
            zipcodeToBeTested = _.padEnd(subZipcode, 8, '0');
        }
        logger.info(util.format('Buscando cep: %s', zipcodeToBeTested));
        latencyMarker.startPoint('service');

        // Consulta o serviço para buscar endereço
        const response = await getZipcode(zipcodeToBeTested);
        latencyMarker.endPoint('service');
        if (!response.data.erro) {
            latencyMarker.startPoint('redis');

            // alimenta o cache caso  resposta positiva do serviço
            await cache.set(key, response.data);
            latencyMarker.endPoint('redis');

            // Monta responsta para retorno
            return buildResponse(response.data, latencyMarker);
        }
    }
    throw new BusinessError({
        message: "Não foi encontrado nenhum cep igual ou similar, por favor tente outro!",
        statusCode: HttpStatus.NOT_FOUND,
        error: 'Not Found'
    })
}

module.exports = {
    zipcodeBusiness
}