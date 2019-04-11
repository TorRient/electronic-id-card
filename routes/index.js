var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});
router.get('/dashboard', function(req, res, next) {
  res.render('admin/dashboard', { title: 'Express' });
});
router.get('/userProfile', function(req, res, next) {
  res.render('admin/userProfile', { title: 'Express' });
});
module.exports = router;
