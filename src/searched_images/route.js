const express = require('express');

const router = express.Router();
const controller = require('./controller');

router.get('/', controller.search);
router.get('/searchedimages', controller.searchedImages);

module.exports = router;
