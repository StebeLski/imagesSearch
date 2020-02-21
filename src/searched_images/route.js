const express = require('express');

const router = express.Router();
const AuthController = require('./controller');

const controller = new AuthController();

router.get('/', controller.search);
router.get('/searchedimages', controller.searchedImages);

module.exports = router;
