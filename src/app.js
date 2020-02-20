const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');

require('dotenv').config();
require('./config/passport')(passport);

const authRoute = require('./users/route');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
// express session
app.use(
  session({
    secret: 'secret ket',
    resave: true,
    saveUninitialized: true,
  }),
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoute);

app.listen(PORT, () => {
  console.log(`server up on http://localhost:${PORT}/`);
});
