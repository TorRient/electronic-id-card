var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Family = new Schema(
    {
        chu_ho: {type: Schema.Types.ObjectId, ref: 'IdentificationCard', require: true},
        thanh_vien: [{type: Schema.Types.ObjectId, ref: 'IdentificationCard', require: true}],
        ho_ngheo: {type: Boolean, require: true},
        tinh: {type: String, require: true}
    }
)

module.exports = mongoose.model('Family', Family)