var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

var User = new Schema(
    {
        user_name: {type:String, require: true, trim: true},
        password: {type: String, require: true},
        first_name: {type: String, trim : true},
        last_name: {type: String, trim: true},
        adress: {type: String, trim: true},
        city: {type: String, trim: true},
        about_me: {type: String, trim: true},
        email: {type: String, trim: true},
        phone: {type: Number, trim: true},
        workplace: {type: String, trim: true}
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