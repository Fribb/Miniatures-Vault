const logger = require('../../utils/logger');
const db = require('../models');

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
        const body = {
            status: 200,
            data: data
        };
        response.status(body.status).json(body);
    }).catch(error => {
        const body = {
            status: 500,
            message: error.message
        };
        response.status(body.status).json(body);
    });
};