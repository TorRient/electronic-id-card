var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Commune = new Schema(
    {
        ten: {type: String, require: true},
        dien_tich: {type: Number, require: true},
        ho_gia_dinh: [{type: Schema.Types.ObjectId, ref: 'Family'}]
    }
);

module.exports = mongoose.model('Commune', Commune);