var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

var User = new Schema(
    {
        user_name: {type:String, require: true, trim: true},
        password: {type: String, require: true},
        first_name: {type: String},
        last_name: {type: String},
        adress: {type: String},
        city: {type: String},
        about_me: {type: String},
        email: {type: String},
        phone: {type: Number}
    }
);

// Sinh mã hash
User.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Kiểm tra password hợp lệ không
User.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', User);