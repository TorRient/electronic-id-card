var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Job = new Schema(
    {
        ten: {type: String, require: true}
    }
)

module.exports = mongoose.model('Job', Job)