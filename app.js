var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const bcrypt = require('bcryptjs');
const flash = require('connect-flash');

const UserModel = require('./models/userModel');

require('dotenv').config();

// connect to mongoDB
const mongoose = require('mongoose');
const mongoDB = process.env.DB_URL
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'MongoDB connection error: '));

// import routes
const router = require('./routes/routes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use((req, res, next) => {
//   let send = res.send;
//   res.send = c => {
//       console.log(`Code: ${res.statusCode}`);
//       console.log("Body: ", c);
//       res.send = send;
//       return res.send(c);
//   }
//   next();
// });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(flash())
app.use(express.static(path.join(__dirname, 'public')));

// configure the LocalStrategy
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  },
  (email, password, cb) => {
    UserModel.findOne({ email: email }, (err, user) => {
      if(err) return cb(err);
      if(!user) return cb(null, false, { message: 'Incorrect email.' });
      bcrypt.compare(password, user.password, (err, res) => {
          if (err) return cb(err);
          if (res)return cb(null, user);
          return cb(null, false, { message: 'Incorrect password.' });
      });
    })
  }
));

passport.serializeUser((user, done) => {
    done(null, user.id)
});
passport.deserializeUser((id, done) => {
    UserModel.findById(id, (err, user) => {
        done(err, user);
    })
});

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

// set current user
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
})

app.use('/', router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
