'use strict';


const { server } = require('../config/server');
const HttpStatus = require('http-status');
const nock = require('nock');
const util = require('util');
const envs = require('../config/environment');
const axios = require('axios');
const cache = require('../config/cache')

const { responseSuccessful, responseFailed, responseSuccessful_2 } = require('./testData/viaCepResponses');

beforeAll((done) => {
    server.events.on('start', () => {
        done();
    });
})

beforeEach(() => {
    nock.disableNetConnect()
    nock.cleanAll()
    
})
afterAll((done) => {
    server.events.on('stop', () => {
        done();
    });
    server.stop();
})
axios.defaults.adapter = require('axios/lib/adapters/http')

test('200 - should return successfull on health route', async () => {
    envs.cache.enabled = false
    const options = {
        method: 'GET',
        url: '/ping',
        headers: {
            'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.AfINaA0ECb8hF2tZSA_oiDZsUQc_10jf_hkv-l-5tEs'
        }
    };
    const data = await server.inject(options);
    expect(data.statusCode).toBe(HttpStatus.OK);
    expect(data.result).toHaveProperty('status', 'pong');
    
});

test('200 - should return successfull', async () => {
    envs.cache.enabled = false
    const options = {
        method: 'GET',
        url: '/address?zipcode=14403131',
        headers: {
            'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.AfINaA0ECb8hF2tZSA_oiDZsUQc_10jf_hkv-l-5tEs'
        }
    };
    nock(util.format('%s', envs.viacep.viaCepUrl))
        .get(util.format('/ws/%s/json', '14403131'))
        .reply(HttpStatus.OK, responseSuccessful)

    const data = await server.inject(options);
    expect(data.statusCode).toBe(HttpStatus.OK);
    expect(data.result.meta.origin).toHaveProperty('cache', false);
    expect(data.result.data).toHaveProperty('cep', '14403-131');
    expect(data.result.data).toHaveProperty('logradouro', 'Rua João Trentino Ziller')
    expect(data.result.data).toHaveProperty('complemento', '')
    expect(data.result.data).toHaveProperty('bairro', 'Jardim Alvorada')
    expect(data.result.data).toHaveProperty('localidade', 'Franca')
    expect(data.result.data).toHaveProperty('uf', 'SP')
    expect(data.result.data).toHaveProperty('ibge', '3516200')
    expect(data.result.data).toHaveProperty('gia', '3104')
    expect(data.result.data).toHaveProperty('ddd', '16')
    expect(data.result.data).toHaveProperty('siafi', '6425')
    
});


test('200 - should return successfull after trying one more time', async () => {
    cache.flush();
    const options = {
        method: 'GET',
        url: '/address?zipcode=14403131',
        headers: {
            'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.AfINaA0ECb8hF2tZSA_oiDZsUQc_10jf_hkv-l-5tEs'
        }
    };
    nock(util.format('%s', envs.viacep.viaCepUrl))
        .get(util.format('/ws/%s/json', '14403131'))
        .reply(HttpStatus.OK, responseFailed)


    nock(util.format('%s', envs.viacep.viaCepUrl))
        .get(util.format('/ws/%s/json', '14403130'))
        .reply(HttpStatus.OK, responseSuccessful_2)

    const data = await server.inject(options);
    expect(data.statusCode).toBe(HttpStatus.OK);
    expect(data.result.data).toHaveProperty('cep', '14403-130');
    expect(data.result.data).toHaveProperty('logradouro', 'Rua Caetano Lombardi')
    expect(data.result.data).toHaveProperty('complemento', '')
    expect(data.result.data).toHaveProperty('bairro', 'Jardim Alvorada')
    expect(data.result.data).toHaveProperty('localidade', 'Franca')
    expect(data.result.data).toHaveProperty('uf', 'SP')
    expect(data.result.data).toHaveProperty('ibge', '3516200')
    expect(data.result.data).toHaveProperty('gia', '3104')
    expect(data.result.data).toHaveProperty('ddd', '16')
    expect(data.result.data).toHaveProperty('siafi', '6425')
});


test('404 - should return not found after trying all the possibilities', async () => {
    cache.flush();
    const options = {
        method: 'GET',
        url: '/address?zipcode=14403131',
        headers: {
            'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.AfINaA0ECb8hF2tZSA_oiDZsUQc_10jf_hkv-l-5tEs'
        }
    };
    nock(util.format('%s', envs.viacep.viaCepUrl))
        .get(util.format('/ws/%s/json', '14403131'))
        .reply(HttpStatus.OK, responseFailed)
    nock(util.format('%s', envs.viacep.viaCepUrl))
        .get(util.format('/ws/%s/json', '14403130'))
        .reply(HttpStatus.OK, responseFailed)
    nock(util.format('%s', envs.viacep.viaCepUrl))
        .get(util.format('/ws/%s/json', '14403100'))
        .reply(HttpStatus.OK, responseFailed)
    nock(util.format('%s', envs.viacep.viaCepUrl))
        .get(util.format('/ws/%s/json', '14403000'))
        .reply(HttpStatus.OK, responseFailed)
    nock(util.format('%s', envs.viacep.viaCepUrl))
        .get(util.format('/ws/%s/json', '14400000'))
        .reply(HttpStatus.OK, responseFailed)
    nock(util.format('%s', envs.viacep.viaCepUrl))
        .get(util.format('/ws/%s/json', '14400000'))
        .reply(HttpStatus.OK, responseFailed)
    nock(util.format('%s', envs.viacep.viaCepUrl))
        .get(util.format('/ws/%s/json', '14000000'))
        .reply(HttpStatus.OK, responseFailed)
    nock(util.format('%s', envs.viacep.viaCepUrl))
        .get(util.format('/ws/%s/json', '10000000'))
        .reply(HttpStatus.OK, responseFailed)
    nock(util.format('%s', envs.viacep.viaCepUrl))
        .get(util.format('/ws/%s/json', '00000000'))
        .reply(HttpStatus.OK, responseFailed)

    const data = await server.inject(options);
    expect(data.statusCode).toBe(HttpStatus.NOT_FOUND);
    expect(data.result).toHaveProperty('message', 'Não foi encontrado nenhum cep igual ou similar, por favor tente outro!')
});



test('400 - should return bad request when pass incorrect zipcode - with letter', async () => {
    envs.cache.enabled = false
    const options = {
        method: 'GET',
        url: '/address?zipcode=1440313a',
        headers: {
            'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.AfINaA0ECb8hF2tZSA_oiDZsUQc_10jf_hkv-l-5tEs'
        }
    };

    const data = await server.inject(options);
    expect(data.statusCode).toBe(HttpStatus.BAD_REQUEST);
    expect(data.result).toHaveProperty('message', '"zipcode" with value "1440313a" fails to match the required pattern: /^[0-9]{8}$/')
});

test('400 - should return bad request when pass incorrect zipcode - bigger than 8 digits', async () => {
    envs.cache.enabled = false
    const options = {
        method: 'GET',
        url: '/address?zipcode=1440313145',
        headers: {
            'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.AfINaA0ECb8hF2tZSA_oiDZsUQc_10jf_hkv-l-5tEs'
        }
    };

    const data = await server.inject(options);
    expect(data.statusCode).toBe(HttpStatus.BAD_REQUEST);
    expect(data.result).toHaveProperty('message', '"zipcode" with value "1440313145" fails to match the required pattern: /^[0-9]{8}$/')

});

test('400 - should return bad request when pass incorrect zipcode - smaller than 8 digits ', async () => {
    envs.cache.enabled = false
    const options = {
        method: 'GET',
        url: '/address?zipcode=144031',
        headers: {
            'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.AfINaA0ECb8hF2tZSA_oiDZsUQc_10jf_hkv-l-5tEs'
        }
    };

    const data = await server.inject(options);
    expect(data.statusCode).toBe(HttpStatus.BAD_REQUEST);
    expect(data.result).toHaveProperty('message', '"zipcode" with value "144031" fails to match the required pattern: /^[0-9]{8}$/')
});

test('400 - should return bad request when pass incorrect zipcode - without de zipcode queryparam', async () => {
    envs.cache.enabled = false
    const options = {
        method: 'GET',
        url: '/address',
        headers: {
            'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.AfINaA0ECb8hF2tZSA_oiDZsUQc_10jf_hkv-l-5tEs'
        }
    };

    const data = await server.inject(options);
    expect(data.statusCode).toBe(HttpStatus.BAD_REQUEST);
    expect(data.result).toHaveProperty('message', '"zipcode" is required')
});

test('400 - should return bad request when pass diferents queryparams', async () => {
    envs.cache.enabled = false
    const options = {
        method: 'GET',
        url: '/address?zipcode=14403131&limit=2',
        headers: {
            'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.AfINaA0ECb8hF2tZSA_oiDZsUQc_10jf_hkv-l-5tEs'
        }
    };

    const data = await server.inject(options);
    console.log(data.result)
    expect(data.statusCode).toBe(HttpStatus.BAD_REQUEST);
    expect(data.result).toHaveProperty('message', '"limit" is not allowed')
});

test('401 - should return unalthorized when pass invalid token', async () => {
    envs.cache.enabled = false
    const options = {
        method: 'GET',
        url: '/address?zipcode=14403131',
        headers: {
            'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.Fzyj62HwBhH2bNZkd9x1fd2s8TIuzUO8JmDMLAcPALY'
        }
    };

    const data = await server.inject(options);
    expect(data.statusCode).toBe(HttpStatus.UNAUTHORIZED);
});

test('200 - should return successfull - with cache', async () => {
    envs.cache.enabled = true
    const options = {
        method: 'GET',
        url: '/address?zipcode=14403131',
        headers: {
            'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.AfINaA0ECb8hF2tZSA_oiDZsUQc_10jf_hkv-l-5tEs'
        }
    };
    nock(util.format('%s', envs.viacep.viaCepUrl))
        .get(util.format('/ws/%s/json', '14403131'))
        .reply(HttpStatus.OK, responseSuccessful)

    const data = await server.inject(options);
    expect(data.statusCode).toBe(HttpStatus.OK);
    expect(data.result.data).toHaveProperty('cep', '14403-131');
    expect(data.result.data).toHaveProperty('logradouro', 'Rua João Trentino Ziller')
    expect(data.result.data).toHaveProperty('complemento', '')
    expect(data.result.data).toHaveProperty('bairro', 'Jardim Alvorada')
    expect(data.result.data).toHaveProperty('localidade', 'Franca')
    expect(data.result.data).toHaveProperty('uf', 'SP')
    expect(data.result.data).toHaveProperty('ibge', '3516200')
    expect(data.result.data).toHaveProperty('gia', '3104')
    expect(data.result.data).toHaveProperty('ddd', '16')
    expect(data.result.data).toHaveProperty('siafi', '6425')
    
});

test('200 - should return successfull - getting from cache', async () => {
    envs.cache.enabled = true
    const options = {
        method: 'GET',
        url: '/address?zipcode=14403131',
        headers: {
            'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.AfINaA0ECb8hF2tZSA_oiDZsUQc_10jf_hkv-l-5tEs'
        }
    };
    nock(util.format('%s', envs.viacep.viaCepUrl))
        .get(util.format('/ws/%s/json', '14403131'))
        .reply(HttpStatus.OK, responseSuccessful)

    const data = await server.inject(options);
    expect(data.statusCode).toBe(HttpStatus.OK);
    expect(data.result.meta.origin).toHaveProperty('cache', true);
    expect(data.result.data).toHaveProperty('cep', '14403-131');
    expect(data.result.data).toHaveProperty('logradouro', 'Rua João Trentino Ziller')
    expect(data.result.data).toHaveProperty('complemento', '')
    expect(data.result.data).toHaveProperty('bairro', 'Jardim Alvorada')
    expect(data.result.data).toHaveProperty('localidade', 'Franca')
    expect(data.result.data).toHaveProperty('uf', 'SP')
    expect(data.result.data).toHaveProperty('ibge', '3516200')
    expect(data.result.data).toHaveProperty('gia', '3104')
    expect(data.result.data).toHaveProperty('ddd', '16')
    expect(data.result.data).toHaveProperty('siafi', '6425')
    
});





