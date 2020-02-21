const express = require('express');

const router = express.Router();
const AuthController = require('./controller');

const controller = new AuthController();

router.post('/login', controller.login);

module.exports = router;
