var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var IdentificationCard  = new Schema(
	{
		so_cmt: {type: Number, require: true},
		ten: {type: String, require: true},
		ngay_sinh: {type: Date, require: true},
		ngay_mat: {type: Date},
		nguyen_quan: {type: String, resuire: true},
		thuong_tru: {type: String, require: true},
		tam_tru: {type: String, require: true},
		dan_toc: {type: String, require: true},
		ton_giao: {type: String, require: true},
		dau_vet_rieng_va_di_hinh: {type: String, default: ""},
		ngay_cap: {type: Date, require: true},
		anh_chan_dung: {type: String, require: true},
		anh_cmt_truoc: {type: String, default: ""},
		anh_cmt_sau: {type: String, default: ""},
		nghe_nghiep: {type: String, require: true}
	}
);

IdentificationCard.virtual('tuoi').get(function(){
	return ((new Date()).getFullYear() - this.ngay_sinh.getFullYear())
});

IdentificationCard.virtual('tuoi_tho').get(function(){
	return (this.ngay_mat.getFullYear() - this.ngay_sinh.getFullYear())
})
module.exports = mongoose.model('IdentificationCard', IdentificationCard);

