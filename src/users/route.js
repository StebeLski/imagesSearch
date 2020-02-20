const express = require('express');

const router = express.Router();
const UsersController = require('./controller');

const controller = new UsersController();

router.post('/login', controller.login);

module.exports = router;
