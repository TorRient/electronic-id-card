var validator = require('express-validator');
var flash = require('connect-flash');
var IdentificationCard = require('../models/identification_card');
exports.insertRecord = function (req, res) {
    var insert = new IdentificationCard({
        so_cmt: req.body.so_cmt,
        ten: req.body.ten,
        ngay_sinh: req.body.ngay_sinh,
        nguyen_quan: req.body.tp_nguyen_quan + ' - ' + req.body.huyen_nguyen_quan + ' - ' + req.body.xa_nguyen_quan,
        thuong_tru: req.body.tp_thuong_tru + ' - ' + req.body.huyen_thuong_tru + ' - ' + req.body.xa_thuong_tru,
        tam_tru: req.body.tp_tam_tru + ' - ' + req.body.huyen_tam_tru + ' - ' + req.body.xa_tam_tru,
        dan_toc: req.body.dan_toc,
        ton_giao: req.body.ton_giao,
        dau_vet_rieng_va_di_hinh: req.body.dau_vet_rieng_va_di_hinh,
        ngay_cap: req.body.ngay_cap,
        anh_chan_dung: req.body.anh_chan_dung,
        anh_cmt_truoc: req.body.anh_cmt_truoc,
        anh_cmt_sau: req.body.anh_cmt_sau,
        nghe_nghiep: req.body.nghe_nghiep
    });

    if (Object.keys(req.body.so_cmt).length === 0
        || Object.keys(req.body.ngay_cap).length === 0
        || Object.keys(req.body.ngay_sinh).length === 0
        || Object.keys(req.body.anh_chan_dung).length === 0
        || Object.keys(req.body.tp_nguyen_quan) === undefined
        || Object.keys(req.body.huyen_nguyen_quan) === undefined
        || Object.keys(req.body.xa_nguyen_quan) === undefined
        || Object.keys(req.body.tp_thuong_tru) === undefined
        || Object.keys(req.body.huyen_tam_tru) === undefined
        || Object.keys(req.body.xa_thuong_tru) === undefined
        || Object.keys(req.body.tp_tam_tru) === undefined
        || Object.keys(req.body.huyen_tam_tru) === undefined
        || Object.keys(req.body.xa_tam_tru) === undefined) {
        console.log('Object missing');
        req.flash('err', 'Not emty');
        return res.redirect('/insertRecord');
    } else {
        IdentificationCard.find({ so_cmt: req.body.so_cmt }, function (err, existing) {
            if (existing.length) {
                console.log("CMT tồn tại");
                return res.redirect('/insertRecord');
            } else {
                console.log("CMT không tồn tại");
                insert.save(function (err) {
                    if (err) {
                        res.json({
                            result: 'failed',
                            data: {},
                            message: 'khong the insert'
                        })
                    } else {
                        console.log("Thêm thành công");
                    }
                })
                return res.redirect('/dashboard');
            };
        });
    };
};