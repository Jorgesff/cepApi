'use strict';

const responseSuccessful = {
    "cep": "14403-131",
    "logradouro": "Rua João Trentino Ziller",
    "complemento": "",
    "bairro": "Jardim Alvorada",
    "localidade": "Franca",
    "uf": "SP",
    "ibge": "3516200",
    "gia": "3104",
    "ddd": "16",
    "siafi": "6425"
};

const responseFailed = {
    "erro": true
};

const responseSuccessful_2 = {
    "cep": "14403-130",
    "logradouro": "Rua Caetano Lombardi",
    "complemento": "",
    "bairro": "Jardim Alvorada",
    "localidade": "Franca",
    "uf": "SP",
    "ibge": "3516200",
    "gia": "3104",
    "ddd": "16",
    "siafi": "6425"
}
module.exports = {
    responseSuccessful,
    responseSuccessful_2,
    responseFailed
}