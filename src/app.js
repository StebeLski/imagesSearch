const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const hbs = require('express-handlebars');
const path = require('path');

require('dotenv').config();
require('./config/passport')(passport);

const authRoute = require('./auth/route');
const searchImagesRoute = require('./searched_images/route');
const likesRoute = require('./likes/route');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
// const publicDirectoryPath = path.join(__dirname, '../public/');
// app.use(express.static(publicDirectoryPath));
app.use(express.static('public'));
app.use('/images', express.static('public'));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/', authRoute);
app.use('/images', searchImagesRoute);
app.use('/likes', likesRoute);

// error handler
app.use((err, req, res, next) => {
  res.render('error', { code: err.code, message: err.message });
});

app.listen(PORT, () => {
  console.log(`server up on http://localhost:${PORT}/`);
});
