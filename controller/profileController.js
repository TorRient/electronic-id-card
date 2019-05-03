User = require('../models/user')

exports.get_profile = (req, res, next) => {
    User.findOne({'user_name': req.user.user_name},'workplace fullname firstname lastname address city aboutme email phone district')
        .exec(function (err, profile) {
            if (err) 
                return next(err)
        console.log(profile)
        res.render('admin/userProfile', {title: 'Profile', profile: profile} )
    })
}

exports.update_profile = (req, res, next) => {
    User.findByIdAndUpdate(req.user.id, req.body, (err, user) => {
        if (err) {
            return res
                .status(500)
                .send({error: "unsuccessful"})
        };
        console.log(req.body.city)
        console.log(req.body.district)
        res.render('admin/userProfile', {title: 'Profile', message: req.flash('Update successful'), profile: req.body })
    });
}

exports.update_password = (req, res, next) => {

}