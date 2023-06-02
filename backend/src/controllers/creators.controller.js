const logger = require('../../utils/logger');
const db = require('../models');
const apiResponses = require('../../utils/api-responses');

/**
 * get all available creators
 *
 * @param {*} request
 * @param {*} response
 */
exports.getAll = (request, response) => {
    logger.info("get all Creators [" + request.originalUrl + "]");

    const attributes = {
    };

    db.Creator.findAll(attributes).then(data => {
        const okResponse = apiResponses.ok(data);
        response.status(okResponse.code).json(okResponse);
    }).catch(error => {
        const errorResponse = apiResponses.generic(error.code, error.message);
        response.status(errorResponse.code).json(errorResponse);
    });

};