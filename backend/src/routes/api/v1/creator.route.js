const router = require('express').Router();
const controller = require('../../../controllers/creators.controller');

router.get('/', controller.getAll);

module.exports = router;