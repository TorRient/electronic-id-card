var LocalStrategy = require('passport-local').Strategy
var RememberMeStrategy = require('passport-remember-me').Strategy
var id = require('../models/identification_card');

var passport = require('passport')
var User = require('../models/user')

// used to serialize the user for the session
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
// used to deserialize the user
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});
    
passport.use('local-login', new LocalStrategy({
    usernameField: 'user_name',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, user_name, password, done) { // callback với email và password từ html form
    // find a user whose user_name is the same as the forms user_name
    // we are checking to see if the user trying to login already exists
    // tìm một user với user_name
    // chúng ta sẽ kiểm tra xem user có thể đăng nhập không
    User.findOne({'user_name': user_name}, function (err, user) {
        if (err)
            return done(err);
        // if no user is found, return the message
        if (!user)
            return done(null, false, req.flash('loginMessage', 'No user found.'));
        // if the user is found but the password is wrong
        if (!user.validPassword(password))
            return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // thông báo lỗi chỉ này chỉ dùng khi dev
        // all is well, return successful user
        return done(null, user);
    });
}));