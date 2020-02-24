/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-shadow */
const passport = require('passport');

class AuthController {
  async login(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.render('error', {
          code: 403,
          message: 'No user with this creds',
        });
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.redirect('/images');
      });
    })(req, res, next);
  }

  loginOpenPage(req, res) {
    res.render('login');
  }
}

module.exports = AuthController;
