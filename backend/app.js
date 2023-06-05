require('dotenv').config();
const logger = require('./utils/logger');
const utils = require('./utils/utils');
const apiResponses = require('./utils/api-responses');

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes
logger.info("Setting up Routes");
app.use(require('./src/routes'));

// catch 404 and forward to error handler
app.use(function (req, res) {
  logger.info("Endpoint not found [" + req.originalUrl + "]");

  const notFound = apiResponses.notFound();

  res.status(notFound.code).json(notFound);
});

app.use(function(err, req, res, next) {

  const error = apiResponses.error();

  if (utils.isProduction()) {
    logger.error(err.message);
  } else {
    logger.error(err.stack);
  }

  res.status(error.code).json(error);
});

module.exports = app;

logger.info("App loaded")