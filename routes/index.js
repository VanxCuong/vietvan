const express = require('express')
const router = express.Router()
var mongoose = require('mongoose');
const User = mongoose.model('User')
const { check,validationResult  } = require('express-validator/check');
const { generatePassword } = require("../utils/authUtils")
const passport = require('passport')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { user : req.user })
});
const validators=[
  check("password","Bạn chưa nhập mật khẩu").not().isEmpty(),
  check("passwordRep","Bạn chưa nhập mật khẩu").not().isEmpty(),
  check("username","Bạn chưa nhập Tài khoản").not().isEmpty(),
]
router.get('/register', (req, res) => {
  res.render("register",{ errors: ''})
});
// register account
router.post('/register', validators , async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ message:Message.MESSING_DATA });
  try {
    if(req.body.password !== req.body.passwordRep)
      return res.render("register", {errors:'Xác nhận mật khẩu không hợp lệ'})
    // encode password
    req.body.password = await generatePassword(req.body.password)
    await User.create(req.body)
    return res.redirect("/login");
  } catch (error) {
    return res.render("register", {errors:'Tên tài khoản đã tồn tại'})
  }
});
// get login
router.get('/login', (req, res) => {
  res.render('login', {errors:''});
});
// post login
router.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    if (!req.user) {
        return res.render('login', {errors:'Tài khoản không hợp lệ'});
    }
    return res.redirect('/');;
});
// logout
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});
module.exports = router;
