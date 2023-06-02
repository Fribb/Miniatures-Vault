const router = require('express').Router();

router.use('/creators', require('./creators.route'));

module.exports = router;