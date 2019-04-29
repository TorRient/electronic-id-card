var IdentificationCard = require('../models/identification_card');

exports.searchID = function (req, res, next) {
    IdentificationCard.findOne({ so_cmt: req.query.search }, function (err, existing) {
        if (err) {
            return console.log(err);
        } else if (!existing) {
            return console.log("Không tìm thấy");
        } else {
            return res.render('admin/searchID', {
                data: existing,
                tp_nguyen_quan: existing.nguyen_quan.split(" - ")[2],
                huyen_nguyen_quan: existing.nguyen_quan.split(" - ")[1],
                xa_nguyen_quan: existing.nguyen_quan.split(" - ")[0],
                tp_thuong_tru: existing.thuong_tru.split(" - ")[2],
                huyen_thuong_tru: existing.thuong_tru.split(" - ")[1],
                xa_thuong_tru: existing.thuong_tru.split(" - ")[0],
                tp_tam_tru: existing.tam_tru.split(" - ")[2],
                huyen_tam_tru: existing.tam_tru.split(" - ")[1],
                xa_tam_tru: existing.tam_tru.split(" - ")[0]
            })
        }
    });
}