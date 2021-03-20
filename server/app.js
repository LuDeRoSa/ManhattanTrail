const path = require('path');
const express = require('express');
const morgan = require('morgan');
const app = express();
module.exports = app;

// const passport = require('passport');
// const Strategy = require('passport-facebook').Strategy;

// passport.use(
//   new Strategy(
//     {
//       clientID: process.env.FB_CLIENT_ID,
//       clientSecret: process.env.FB_CLIENT_SECRET,
//       callbackURL: 'auth/facebook/callback',
//     },
//     function (accessToken, refreshToken, profile, cb) {
//       // save the profile on the Database
//       // Save the accessToken and refreshToken if you need to call facebook apis later on
//       return cb(null, profile);
//     }
//   )
// );

// passport.serializeUser(function (user, cb) {
//   cb(null, user);
// });

// passport.deserializeUser(function (obj, cb) {
//   cb(null, obj);
// });

// app.use(
//   require('express-session')({
//     secret: 'keyboard cat',
//     resave: true,
//     saveUninitialized: true,
//   })
// );

app.use(passport.initialize());
app.use(passport.session());

app.use('/facebook', passport.authenticate('facebook'));

// logging middleware
app.use(morgan('dev'));

// body parsing middleware
app.use(express.json());

//use ejs renderer in order to pass data html files
app.engine('html', require('ejs').renderFile);

// auth and api routes
app.use('/auth', require('./auth'));
app.use('/api', require('./api'));

const githubURL = process.env.GITHUB_CLIENT_ID
  ? `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  : null;

app.get('/', (req, res) =>
  res.render(path.join(__dirname, '..', 'public/index.html'), { githubURL })
);

// static file-serving middleware
app.use(express.static(path.join(__dirname, '..', 'public')));

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

// sends index.html
app.use('*', (req, res) => {
  res.render(path.join(__dirname, '..', 'public/index.html'), { githubURL });
});

// error handling endware
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});
