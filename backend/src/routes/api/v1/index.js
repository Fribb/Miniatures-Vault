const router = require('express').Router();

router.use('/creator', require('./creator.route'));

module.exports = router;