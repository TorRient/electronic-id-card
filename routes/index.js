var express = require('express');
var router = express.Router();
var validator = require('express-validator');
var loginController = require('../controller/loginController')
var passport = require('passport');
var utils = require('utils');
var chart = require('../controller/chart');

var IdentificationCard = require('../models/identification_card');
var insertRecord = require('../controller/insertRecord');
var profileController = require('../controller/profileController')

var searchID = require('../controller/searchID');
var editID = require('../controller/editID');

var dan_toc_cfg = require('../config/dan_toc');
var ton_giao_cfg = require('../config/ton_giao');
var nghe_nghiep_cfg = require('../config/nghe_nghiep');
var dan_toc = dan_toc_cfg;
var ton_giao = ton_giao_cfg;
var nghe_nghiep = nghe_nghiep_cfg

/* GET home page. */
router.get('/', async function (req, res, next) {
  var result = await chart.load_result();
  var statistics = JSON.parse(result.statistic_result) ;
  var percent_age = result.percent_age ;
  var percent_jobs = result.percent_jobs ;
  var percent_religious = result.percent_religious ;
  var date_statistic = result.date_statistic ;
  res.render('index', {
    statistic : statistics,
    percent_age : percent_age,
    percent_jobs : percent_jobs,
    percent_religious : percent_religious,
    date_statistic : date_statistic
   });
});

// Xử lý thông tin khi có người thực hiện đăng nhập
router.get('/login', loginController.get_login);

router.post('/login',
  passport.authenticate("local-login", {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
  })
);

router.get('/logout', loginController.logout);

// Xử lý thông tin khi admin lấy profile
router.get('/userProfile', isLoggedIn, profileController.get_profile);

router.get('/dashboard',isLoggedIn, async function (req, res, next) {
  var result = await chart.load_result();
  var statistics = JSON.parse(result.statistic_result) ;
  var percent_age = result.percent_age ;
  var percent_jobs = result.percent_jobs ;
  var percent_religious = result.percent_religious ;
  var date_statistic = result.date_statistic ;
  res.render('admin/dashboard', {
    statistic : statistics,
    percent_age : percent_age,
    percent_jobs : percent_jobs,
    percent_religious : percent_religious,
    date_statistic : date_statistic
   })
  });


router.use('/runStatistic',chart.run_statistic);

router.post('/userProfile', isLoggedIn, profileController.update_profile);


// GET search
router.get('/searchID',isLoggedIn, searchID.searchID);

// POST delete search
router.post('/searchID/:id', function(req, res){
 IdentificationCard.remove({so_cmt: req.params.id}, function(err){
   if(err){
     console.log(err);
   }else{
     res.redirect('/dashboard');
   }
 })
});

// GET edit ID
router.get('/editID/:id',isLoggedIn, function (req, res) {
  IdentificationCard.findOne({ so_cmt: req.params.id }, function (err, existing) {
    if (err) {
      return console.log(err);
    } else if (!existing) {
      return console.log("Không tìm thấy");
    } else {
      return res.render('admin/editID', {
        data: existing,
        tp_nguyen_quan: existing.nguyen_quan.split(" - ")[2],
        huyen_nguyen_quan: existing.nguyen_quan.split(" - ")[1],
        xa_nguyen_quan: existing.nguyen_quan.split(" - ")[0],
        tp_thuong_tru: existing.thuong_tru.split(" - ")[2],
        huyen_thuong_tru: existing.thuong_tru.split(" - ")[1],
        xa_thuong_tru: existing.thuong_tru.split(" - ")[0],
        tp_tam_tru: existing.tam_tru.split(" - ")[2],
        huyen_tam_tru: existing.tam_tru.split(" - ")[1],
        xa_tam_tru: existing.tam_tru.split(" - ")[0],
        dan_toc: dan_toc,
        ton_giao: ton_giao,
        nghe_nghiep: nghe_nghiep,
        conditional: 0
      });
    };
  });
})
// POST edit ID
router.post('/editID/:id', editID.editID);

// POST insert record
router.post('/insertRecord',isLoggedIn, insertRecord.insertRecord);

// GET insert
router.get('/insertRecord',isLoggedIn, function (req, res) {
  res.render('admin/insertRecord', {
    dan_toc: dan_toc,
    ton_giao: ton_giao,
    nghe_nghiep: nghe_nghiep,
    conditional: 0
  });``
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