var IdentificationCard = require('../models/identification_card');
var moment = require('moment');

exports.searchID = function (req, res, next) {
    IdentificationCard.findOne({ so_cmt: req.query.search }, function (err, existing) {
        if (err) {
            return console.log(err);
        } else if (!existing) {
            return res.render('admin/searchID',{
                data: {
                    ten: ' ',
                    so_cmt: ' ',
                    ton_giao: ' ',
                    nghe_nghiep: ' ',
                    dau_vet_rieng_va_di_hinh: ' '
                },
                conditional: 1,
                ngay_sinh: ' ',
                ngay_cap: ' ',
                tp_nguyen_quan: ' ',
                huyen_nguyen_quan: ' ',
                xa_nguyen_quan: ' ',
                tp_thuong_tru: ' ',
                huyen_thuong_tru: ' ',
                xa_thuong_tru: ' ',
                tp_tam_tru: ' ',
                huyen_tam_tru: ' ',
                xa_tam_tru: ' ',
                title : "Search ID"
            })
        } else {
            return res.render('admin/searchID', {
                data: existing,
                conditional: 0,
                ngay_sinh: moment(existing.ngay_sinh).format('MM / DD / YYYY'),
                ngay_cap: moment(existing.ngay_cap).format('MM / DD / YYYY'),
                tp_nguyen_quan: existing.nguyen_quan.split(" - ")[2],
                huyen_nguyen_quan: existing.nguyen_quan.split(" - ")[1],
                xa_nguyen_quan: existing.nguyen_quan.split(" - ")[0],
                tp_thuong_tru: existing.thuong_tru.split(" - ")[2],
                huyen_thuong_tru: existing.thuong_tru.split(" - ")[1],
                xa_thuong_tru: existing.thuong_tru.split(" - ")[0],
                tp_tam_tru: existing.tam_tru.split(" - ")[2],
                huyen_tam_tru: existing.tam_tru.split(" - ")[1],
                xa_tam_tru: existing.tam_tru.split(" - ")[0],
                title : "Search ID"
            })
        }
    });
}