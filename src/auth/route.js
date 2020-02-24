const express = require('express');

const router = express.Router();
const AuthController = require('./controller');
const { isLoggedIn } = require('../middlewars');

const controller = new AuthController();

router.get('/', controller.loginOpenPage);
router.get('/logout', isLoggedIn, (req, res) => {
  req.logout();
  res.redirect('/');
});
router.post('/login', controller.login);

module.exports = router;
