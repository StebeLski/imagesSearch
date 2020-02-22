const express = require('express');

const router = express.Router();
const controller = require('./controller');
const { isLoggedIn } = require('../middlewars');

router.get('/', isLoggedIn, controller.search);
router.get('/searchedimages', isLoggedIn, controller.searchedImages);

module.exports = router;
