/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-shadow */
const passport = require('passport');

class AuthController {
  async login(req, res, next) {
    console.log(req.body);
    passport.authenticate('local', (err, user, info) => {
      console.log(user);
      console.log(info);
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.send('no user OBJECT returned');
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        console.log('as');
        return res.redirect('/images');
      });
    })(req, res, next);
  }

  loginOpenPage(req, res) {
    res.render('login');
  }
}

module.exports = AuthController;
