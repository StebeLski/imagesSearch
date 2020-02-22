const express = require('express');

const router = express.Router();
const controller = require('./controller');
const { isLoggedIn } = require('../middlewars');

router.get('/', isLoggedIn, controller.checklikes);
router.post('/', isLoggedIn, controller.addlike);

module.exports = router;
