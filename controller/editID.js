var IdentificationCard = require('../models/identification_card');
var dan_toc_cfg = require('../config/dan_toc');
var ton_giao_cfg = require('../config/ton_giao');
var nghe_nghiep_cfg = require('../config/nghe_nghiep');
var dan_toc = dan_toc_cfg;
var ton_giao = ton_giao_cfg;
var nghe_nghiep = nghe_nghiep_cfg;

exports.editID = function (req, res) {
    var set = {
      $set: {
        so_cmt: req.body.so_cmt,
        ten: req.body.ten,
        ngay_sinh: req.body.ngay_sinh,
        nguyen_quan: req.body.xa_nguyen_quan + ' - ' + req.body.huyen_nguyen_quan + ' - ' + req.body.tp_nguyen_quan,
        thuong_tru: req.body.xa_thuong_tru + ' - ' + req.body.huyen_thuong_tru + ' - ' + req.body.tp_thuong_tru,
        tam_tru: req.body.xa_tam_tru + ' - ' + req.body.huyen_tam_tru + ' - ' + req.body.tp_tam_tru,
        dan_toc: req.body.dan_toc,
        ton_giao: req.body.ton_giao,
        dau_vet_rieng_va_di_hinh: req.body.dau_vet_rieng_va_di_hinh,
        ngay_cap: req.body.ngay_cap,
        nghe_nghiep: req.body.nghe_nghiep
      }
    }
    IdentificationCard.updateOne({ so_cmt: req.params.id }, set, function (err, existing) {
      if (err) {
        console.log(err);
      } else {
        return res.render('admin/editID', {
          data: {
            ten: req.body.ten,
            so_cmt: req.body.so_cmt,
            ngay_sinh: req.body.ngay_sinh,
            dan_toc: req.body.dan_toc,
            ton_giao: req.body.ton_giao,
            nghe_nghiep: req.body.nghe_nghiep,
            dau_vet_rieng_va_di_hinh: req.body.dau_vet_rieng_va_di_hinh
          },
          tp_nguyen_quan: req.body.tp_nguyen_quan,
          huyen_nguyen_quan: req.body.huyen_nguyen_quan,
          xa_nguyen_quan: req.body.xa_nguyen_quan,
          tp_thuong_tru: req.body.tp_thuong_tru,
          huyen_thuong_tru: req.body.huyen_thuong_tru,
          xa_thuong_tru: req.body.xa_thuong_tru,
          tp_tam_tru: req.body.tp_tam_tru,
          huyen_tam_tru: req.body.huyen_tam_tru,
          xa_tam_tru: req.body.xa_tam_tru,
          dan_toc: dan_toc,
          ton_giao: ton_giao,
          nghe_nghiep: nghe_nghiep,
          conditional: 2,
          title: "Edit ID"
        });
      };
    });
};