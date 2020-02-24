const express = require('express');

const router = express.Router();
const controller = require('./controller');
const { isLoggedIn } = require('../middlewars');

router.get('/', isLoggedIn, controller.allUsersLikes);
router.post('/', isLoggedIn, controller.addlike);

module.exports = router;
