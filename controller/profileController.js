User = require('../models/user')

exports.get_profile = (req, res, next) => {
    User.findOne({'user_name': req.user.user_name},'workplace fullname firstname lastname address city aboutme email phone district')
        .exec(function (err, profile) {
            if (err) 
                return next(err)
        res.render('admin/userProfile', {title: 'Profile', username: req.user.user_name, condition : 0, profile: profile} )
    })
}

exports.update_profile = (req, res, next) => {
    User.findByIdAndUpdate(req.user.id, req.body, (err, user) => {
        if (err) {
            return res.render('admin/userProfile', {title: 'Profile', condition : 500, profile: req.body })
        };
        res.render('admin/userProfile', {title: 'Profile', username: req.user.user_name, condition : 1, profile: req.body })
    });
}

exports.update_password = (req, res, next) => {

}