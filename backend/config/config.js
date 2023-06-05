require('dotenv').config()
const logger = require('../utils/logger');

module.exports = {
  development: {
    logging: (msg) => logger.debug(msg),
    dialect: process.env.DB_DIALECT,
    storage: process.env.DB_STORAGE
  },
  test: {
    logging: false,
    dialect: "sqlite",
    storage: ":memory:"
  },
  production: {
    logging: (msg) => logger.debug(msg),
    dialect: process.env.DB_DIALECT,
    storage: process.env.DB_STORAGE
  }
};