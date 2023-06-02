const utils = module.exports;

/**
 * return the state of the environment
 *
 * @returns {boolean}
 */
utils.isProduction = function() {
    return process.env.NODE_ENV === 'production';
};