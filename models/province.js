var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Province = new Schema(
    {
        ten: {type: String, require: true},
        dien_tich: {type: Number, require: true},
        quan: [{type: Schema.Types.ObjectId, ref:'District'}],
        huyen: [{type: Schema.Types.ObjectId, ref:'District'}],
        thi_xa: [{type: Schema.Types.ObjectId, ref:'District'}],
    }
);

module.exports = mongoose.model('Province', Province);