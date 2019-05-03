var express = require('express');
var router = express.Router();
var validator = require('express-validator');
var loginController = require('../controller/loginController')
var passport = require('passport');
var utils = require('utils');

var insertRecord = require('../controller/insertRecord');
var profileController = require('../controller/profileController')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// Xử lý thông tin khi có người thực hiện đăng nhập
router.get('/login', loginController.get_login);

router.post('/login',
  passport.authenticate("local-login", {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
  })
)

router.get('/logout', loginController.logout);

// Xử lý thông tin khi admin lấy profile
router.get('/userProfile', isLoggedIn, profileController.get_profile);

router.post('/userProfile', isLoggedIn, profileController.update_profile);

router.get('/dashboard',isLoggedIn, function (req, res, next) {
  res.render('admin/dashboard', { username: req.user.user_name });
});

// POST insert record
router.post('/insertRecord',isLoggedIn, insertRecord.insertRecord);

// GET insert
var dan_toc_cfg = require('../config/dan_toc');
var ton_giao_cfg = require('../config/ton_giao');
var nghe_nghiep_cfg = require('../config/nghe_nghiep');
router.get('/insertRecord', function (req, res) {
  var dan_toc = dan_toc_cfg;
  var ton_giao = ton_giao_cfg;
  var nghe_nghiep = nghe_nghiep_cfg
  res.render('admin/insertRecord', {
    dan_toc: dan_toc,
    ton_giao: ton_giao,
    nghe_nghiep: nghe_nghiep,
    conditional : 0
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
