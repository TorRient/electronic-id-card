var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var District = new Schema(
    {
        ten: {type: String, require: true},
        dien_tich: {type: Number, require: true},
        xa: [{type: Schema.Types.ObjectId, ref: 'Commune'}],
        phuong: [{type: Schema.Types.ObjectId, ref: 'Commune'}]
    }
);

module.exports = mongoose.model('District', District);