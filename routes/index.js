var express = require('express');
var router = express.Router();
var validator = require('express-validator');
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
var IdentificationCard = require('../models/identification_card');
router.post('/insertRecord', function(req, res){
    var insert = new IdentificationCard({
      so_cmt: req.body.so_cmt,
		  ten: req.body.ten,
		  ngay_sinh: req.body.ngay_sinh,
		  nguyen_quan: req.body.tp_nguyen_quan + ' - ' + req.body.huyen_nguyen_quan + ' - ' + req.body.xa_nguyen_quan,
		  thuong_tru: req.body.tp_thuong_tru + ' - ' + req.body.huyen_thuong_tru + ' - ' + req.body.xa_thuong_tru,
		  tam_tru: req.body.tp_tam_tru + ' - ' + req.body.huyen_tam_tru + ' - ' + req.body.xa_tam_tru,
		  dan_toc: req.body.dan_toc,
		  ton_giao: req.body.ton_giao,
		  dau_vet_rieng_va_di_hinh: req.body.dau_vet_rieng_va_di_hinh,
		  ngay_cap: req.body.ngay_cap,
		  anh_chan_dung: req.body.anh_chan_dung,
		  anh_cmt_truoc: req.body.anh_cmt_truoc,
		  anh_cmt_sau: req.body.anh_cmt_sau,
		  nghe_nghiep: req.body.nghe_nghiep
    })
    insert.save(function(err){
      if(err){
        res.json({
          result: 'failed',
          data: {},
          message: 'khong the insert'
        })
      }else{
        console.log("Thêm thành công");
      }
    });
    return res.redirect('/dashboard');
});
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
