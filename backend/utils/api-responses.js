const StatusCodes = require('http-status-codes').StatusCodes;
const ReasonPhrases = require('http-status-codes').ReasonPhrases;
const responses = module.exports;

responses.response = function (code, message, data) {
    const responseJson = {};
    if (code) {
        responseJson.code = code;
    }
    if (message) {
        responseJson.message = message;
    }
    if (data) {
        responseJson.data = data;
    }
    return responseJson;
};

/**
 * a generic response
 *
 * @param code
 * @param message
 * @param data
 * @returns {{}}
 */
responses.generic = function (code, message, data) {
    return this.response(code, message, data);
};

/**
 * an OK response with Status code 200
 *
 * @param data
 * @returns {{}}
 */
responses.ok = function (data) {
    return this.response(StatusCodes.OK, ReasonPhrases.OK, data);
};

/**
 * a NOT FOUND response with status code 404
 *
 * @param data
 * @returns {{}}
 */
responses.notFound = function (data) {
    return this.response(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND, data);
};

/**
 * an INTERNAL SERVER ERROR response with status code 500
 * @returns {{}}
 */
responses.error = function () {
    return this.response(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR);
};

/**
 * a BAD REQUEST response with the Status code 400
 *
 * @returns {{}}
 */
responses.badRequest = function (reason) {
    return this.response(StatusCodes.BAD_REQUEST, reason);
};