require('dotenv').config();
const logger = require('./utils/logger');

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
const isProduction = process.env.NODE_ENV === 'production'

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes
logger.info("Setting up Routes");
app.use(require('./src/routes'));

// catch 404 and forward to error handler
app.use(function (req, res) {
  let statusCode = 404;
  let error = createError(statusCode);
  logger.warn(`route "${req.originalUrl}" ${error.message}`);
  res.status(statusCode).json(error);
});

// error handler

app.use(function(err, req, res) {
  let statusCode = err.status || 500;
  let error = createError(statusCode);

  if (!isProduction) {
    logger.error(err.stack);
  } else {
    logger.error(err.message);
  }

  res.status(statusCode).json(error);
});

// database handler
logger.info("setting up Database");
const database = require("./src/models");
if (isProduction) {
  database.sequelize.sync();
} else {
  database.sequelize.sync({force: true });
}

module.exports = app;

logger.info("Server start complete in " + process.env.NODE_ENV + " mode");