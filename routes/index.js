var express = require('express');
var router = express.Router();
var validator = require('express-validator');
var loginController = require('../controller/loginController')
var passport = require('passport');
var utils = require('utils');

var insertRecord = require('../controller/insertRecord');

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

router.get('/dashboard', function(req, res, next) {
  res.render('admin/dashboard', { title: 'Express' });
});

router.get('/userProfile', isLoggedIn,  function(req, res, next) {
  res.render('admin/userProfile', { title: 'Express' });
});

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

// POST insert record
router.post('/insertRecord', insertRecord.insertRecord);

// GET insert
var dan_toc_cfg = require('../config/dan_toc');
var ton_giao_cfg = require('../config/ton_giao');
var nghe_nghiep_cfg = require('../config/nghe_nghiep');
router.get('/insertRecord', function (req, res) {
  var dan_toc = dan_toc_cfg;
  var ton_giao = ton_giao_cfg;
  var nghe_nghiep = nghe_nghiep_cfg
  res.render('admin/insertRecord', {
    dan_toc : dan_toc,
    ton_giao: ton_giao,
    nghe_nghiep: nghe_nghiep
  });
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
