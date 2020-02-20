const express = require('express');
const passport = require('passport');

require('dotenv').config();
require('./config/passport')(passport);

const authRoute = require('./users/route');

const app = express();
const PORT = process.env.PORT || 8080;

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoute);

app.listen(PORT, () => {
  console.log(`server up on http://localhost:${PORT}/`);
});
