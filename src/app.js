const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const hbs = require('express-handlebars');
const path = require('path');

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

app.engine(
  'hbs',
  hbs({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, '/views/layouts/'),
  }),
);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoute);

app.listen(PORT, () => {
  console.log(`server up on http://localhost:${PORT}/`);
});
