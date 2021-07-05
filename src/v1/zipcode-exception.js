'use strict';


function BusinessError(options) {
    this.message = options.message;
    this.statusCode = options.statusCode;
}

BusinessError.prototype = Object.create(BusinessError.prototype);
BusinessError.prototype.constructor = BusinessError;

module.exports = BusinessError