var express = require('express');
var router = express.Router();
var loginController = require('../controller/loginController')
var passport = require('passport')

exports.login_get = (req, res, next) => {
    res.render('login', { title: 'Express', message: req.flash('loginMessage') } );
}

exports.login_post = (req, res, next) => {
    passport.authenticate("local-login", {
        successRedirect : '/dashboard',
        failureRedirect : '/login',
        failureFlash : true
    })
}