const express = require('express');

const router = express.Router();
const controller = require('./controller');
const { isLoggedIn } = require('../middlewars');

router.post('/', isLoggedIn, controller.addlike);
router.get('/', isLoggedIn, controller.checklikes);

module.exports = router;
