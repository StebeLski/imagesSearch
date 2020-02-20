const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const db = require('../db/index');

module.exports = (passport) => {
  passport.use(
    new LocalStrategy(
      { usernameField: 'name', passwordField: 'password' },
      (username, password, done) => {
        console.log(password);
        const sql = `SELECT id, name, password
                   FROM users
                   WHERE name = ?`;
        db.get(sql, [username], (err, row) => {
          if (!row) {
            return done(null, false, {
              message: 'There is no user with this name',
            });
          }
          bcrypt.compare(password, row.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              const { password: removePass, ...rowdata } = row;
              return done(null, rowdata);
            }
            console.log('pass inncorect');
            return done(null, false, {
              message: 'Password incorrect',
            });
          });
        });
      },
    ),
  );

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((id, done) => {
    db.get('SELECT id, name FROM users WHERE id = ?', [id], (err, row) => {
      if (!row) return done(null, false);
      return done(null, row);
    });
  });
};
