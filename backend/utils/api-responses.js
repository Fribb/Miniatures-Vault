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

responses.generic = function (code, message, data) {
    return this.response(code, message, data);
};

responses.ok = function (data) {
    return this.response(StatusCodes.OK, ReasonPhrases.OK, data);
};

responses.notFound = function (data) {
    return this.response(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND, data);
};

responses.error = function () {
    return this.response(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR);
};