User = require('../models/user')

exports.get_profile = (req, res, next) => {
    User.find({},'first_name, last_name, adress, city, about_me, email, phone')
        .exec(function (err, profile) {
            if (err) 
                return next(err)
            res.render('admin/userProfile', {title: 'Profile', profile: profile} )
        })
}