const logger = require('../../utils/logger');
const db = require('../models');
const apiResponses = require('../../utils/api-responses');
const uuid = require('uuid');

function createNewCreator(body) {
    const creator = {
        id: uuid.v4(),
        name: body.name
    };
    if (body.imagePath) { creator.imagePath = body.imagePath; }
    if (body.link) { creator.link = body.link; }

    return creator;
}

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

    db["Creator"].findAll(attributes).then(data => {
        const okResponse = apiResponses.ok(data);
        response.status(okResponse.code).json(okResponse);
    }).catch(error => {
        logger.error(error);

        const errorResponse = apiResponses.generic(error.code, error.message, null);
        response.status(errorResponse.code).json(errorResponse);
    });

};

/**
 * get a creator by their ID
 *
 * @param request
 * @param response
 */
exports.getOne = (request, response) => {
    logger.info("get Creator with ID=" + request.params.id + " [" + request.originalUrl + "]");

    const id = request.params.id;
    const attributes = {
    };

    db["Creator"].findByPk(id, attributes).then(data => {

        let r;

        if (data === null) {
            r = apiResponses.badRequest("Creator not found");
        } else {
            r = apiResponses.ok(data);
        }

        response.status(r.code).json(r);
    }).catch(error => {
        logger.error(error);

        const r = apiResponses.generic(error.code, error.message, null);
        response.status(r.code).json(r);
    });
};

/**
 * create a new Creator
 *
 * @param request
 * @param response
 */
exports.create = (request, response) => {
    logger.info("Creating a new Creator [" + request.originalUrl + "]");

    // the name of the Creator is required to save it in the Database
    if (!request.body.name) {
        logger.error("The Name of the Creator is required but was empty!");
        const r = apiResponses.badRequest("Creator name is required");
        response.status(r.code).json(r);
    } else {
        const creator = createNewCreator(request.body);
        const attributes = {
        };

        db["Creator"].create(creator, attributes).then(data => {
            logger.info("New Creator created with ID=" + data.id);

            const r = apiResponses.ok(data);
            response.status(r.code).json(r);
        }).catch(error => {
            logger.error(error);

            const r = apiResponses.error()
            r.status(r.code).json(r);
        });
    }
};

/**
 * update an existing Creator and return new
 *
 * @param request
 * @param response
 */
exports.update = (request, response) => {
    logger.info("Updating existing Creator [" + request.originalUrl + "]");

    // to update a Creator both the ID and name are required
    if (!request.body.name) {
        logger.error("Update failed: name is required");

        const r = apiResponses.badRequest("Creator name is required");
        response.status(r.code).json(r);
    } else {
        const id = request.params.id;
        const attributes = {
        };

        db["Creator"].update(request.body, { where: {id: id} }).then(num => {
            if (num == 1) {
                logger.info("Updated Creator with ID=" + id);

                db["Creator"].findByPk(id, attributes).then(newData => {
                    logger.info("Found Updated Creator with ID=" + id);

                    const r = apiResponses.ok(newData);
                    response.status(r.code).json(r);
                }).catch(error => {
                    const r = apiResponses.generic(error.code, error.message,null);
                    response.status(r.code).json(r);
                });
            } else {
                logger.error("Could not Update Creator with ID=" + id);

                const r = apiResponses.badRequest("Creator not found");
                response.status(r.code).json(r);
            }
        }).catch(error => {
            logger.error(error);

            const r = apiResponses.error();
            response.status(r.code).json(r);
        });
    }
};

/**
 * delete a creator
 *
 * @param request
 * @param response
 */
exports.delete = (request, response) => {
    logger.info("Deleting Creator [" + request.originalUrl + "]");

    const id = request.params.id;
    const attributes = {};

    db["Creator"].destroy({ where: {id:id} }).then(num => {
        if (num === 1) {
            logger.info("Creator deleted ID=" + id);

            const r = apiResponses.ok(null);
            response.status(r.code).json(r);
        } else {
            logger.error("Could not delete Creator with ID=" + id + " creator does not exist");

            const r = apiResponses.badRequest("Creator does not exist");
            response.status(r.code).json(r);
        }
    }).catch(error => {
        logger.error(error);

        const r = apiResponses.error();
        response.status(r.code).json(r);
    });
};