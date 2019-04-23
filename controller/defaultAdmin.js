var User = require('../models/user')

var admin = {
    user_name: "Admin User",
    password: "20162569"
}

console.log(admin)
User.findOne({'user_name': admin.user_name}, function(err, user, next) {
    if (err) {
        console.log(err)
    } else if (user) {
        console.log("Da ton tai user")
    } else {
        var newUser = new User()

        
        newUser.user_name = admin.user_name
        newUser.password = newUser.generateHash(admin.password)

        newUser.save(function (err) {
            if (err)
                throw err;
        });
    }
})

