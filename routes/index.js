var express = require('express');
var router = express.Router();
var loginController = require('../controller/loginController')
var passport = require('passport')
var utils = require('utils')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Xử lý thông tin khi có người thực hiện đăng nhập
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express', message : req.flash('loginMessage') } );
});

router.post('/login',
  passport.authenticate("local-login", {
    successRedirect : '/dashboard',
    failureRedirect : '/login',
    failureFlash : true
  })
)

router.get('/dashboard', isLoggedIn, function(req, res, next) {
  res.render('admin/dashboard', { title: 'Express' });
});

router.get('/userProfile', isLoggedIn,  function(req, res, next) {
  res.render('admin/userProfile', { title: 'Express' });
});

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

// route middleware để kiểm tra một user đã đăng nhập hay chưa?
function isLoggedIn(req, res, next) {
  // Nếu một user đã xác thực, cho đi tiếp
  if (req.isAuthenticated())
      return next();
  // Nếu chưa, đưa về trang chủ
  res.redirect('/');
}
module.exports = router;
