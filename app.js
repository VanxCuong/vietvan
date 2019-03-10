var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
const session = require('express-session')

// mongodb://localhost:27017/firstapp   - mongodb://vanxcuong:12345612@ds117759.mlab.com:17759/firstapp
mongoose.connect('mongodb://vanxcuong:abc123@ds123371.mlab.com:23371/vietvan', { useNewUrlParser: true } ,function(err){
  if(err){
    console.log("Connect database failed !!!");
  }else{
    console.log("Connect database success !!!");
  }
});
require('./models')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// PASSPORT
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = mongoose.model('User')

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
    session: true
  },
  (username, password, done) => {
    User.authenticate(username, password, done);
  }
))
// SESSION
// app.use(session({
//   secret: 'MasterTVC',
//   cookie: {
//     httpOnly: true,
//     secure: true,
//     maxAge: 1000 * 60 * 60 * 24 * 7 // session tồn tại trong 7 ngày
//   },
//   resave: false,
//   saveUninitialized: true
// }));
app.use(session({
  secret: 'MasterTVC',
  resave: false,
  saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());

var indexRouter = require('./routes/index');

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  return res.status(err.status || 500).json({
    error: err.error || 'Error',
    message: err.message || 'Lỗi không xác định'
  })
})
module.exports = app;
