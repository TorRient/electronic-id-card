#! /usr/bin/env node

// Sử dụng để tạo dữ liệu mẫu trên database

console.log('This script populates some test identification, distric, ... for project');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);

var async = require('async');
var IdentifivationCard = require('./models/identification_card');
var Family = require('./models/family');
var Commune = require('./models/commune');
var District = require('./models/district');
var Province = require('./models/province');
var Job = require('./models/job');


var mongoose = require('mongoose');
var mongoDB = userArgs[0]
mongoose.connect(mongoDB, {useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connect error:'));

var identification_cards = []
var families = []
var communes = []
var districts = []
var provinces = []
var jobs = []

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function jobCreate(ten, cb) {
    var job = new Job({ten: ten});

    job.save(function(err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New Job: ' + job);
        jobs.push(job);
        cb(null, job);
    }) 
}

function identificationCreate(count, cb) {
    identification_detail = {}
    identification_detail.so_cmt = 111111111 + parseInt(count);
    identification_detail.ten = 'Nguyễn Văn Minh ' + count;
    identification_detail.ngay_sinh = new Date(1990, 0, 1)

    if (Math.random() > 0.5) {
        identification_detail.ngay_mat = new Date(2050, 0, 1);
    }

    identification_detail.nguyen_quan = 'Ninh Bình';
    identification_detail.thuong_tru = 'Ninh Bình';
    identification_detail.tam_tru = 'Ninh Bình';
    identification_detail.dan_toc = 'Kinh';
    identification_detail.ton_giao = 'Không';
    identification_detail.dau_vet_rieng_va_di_hinh = 'Không';
    identification_detail.ngay_cap = new Date(2030, 0, 1);
    identification_detail.anh_chan_dung = './img_identification/' + count + '.jpg';
    identification_detail.anh_cmt_truoc = './img_identification/' + count + '.jpg';
    identification_detail.anh_cmt_sau = './img_identification/' + count + '.jpg';
    identification_detail.nghe_nghiep = jobs[0];

    var identification = new IdentifivationCard (identification_detail);

    identification.save( function(err) {
        if (err) {
            cb(err, null);
            return;
        }

        console.log('New IdentificationCard:' + identification);
        identification_cards.push(identification);
        cb(null, identification)
    })
};

function familyCreate(cb){
    family_detail = {}
    family_detail.chu_ho = identification_cards[Math.floor(Math.random()* 10)];
    family_detail.thanh_vien = [family_detail.chu_ho]
    for (let i = 0; i < Math.floor(Math.random()*6) ; i++) {
        if (family_detail[i] != family_detail.chu_ho) {
            family_detail.thanh_vien.push(family_detail[i])
        }
    }

    if (Math.random() > 0.5) {
        family_detail.ho_ngheo = true;
    } else family_detail.ho_ngheo = false;
    
    var family = new Family(family_detail);

    family.save( function(err) {
        if (err) {
            cb(err, null);
            return;
        }

        console.log('New Family:' + family);
        families.push(family);
        cb(null, family)
    })
}

function communeCreate(name, cb) {
    commune_detail = {}
    commune_detail.ten = name;
    commune_detail.dien_tich = 320000;
    commune_detail.ho_gia_dinh = []
    for (let i = 0; i < Math.floor(Math.random() * 10); i++) {
        commune_detail.ho_gia_dinh.push(families[Math.floor(Math.random()*families.length)]);
    }

    var commune = new Commune(commune_detail);

    commune.save( function(err) {
        if (err) {
            cb(err, null);
            return;
        }

        console.log('New Commune: ' + commune);
        communes.push(commune);
        cb(null, commune)
    })
}

function districtCreate (name, cb) {
    districts_detail = {}
    districts_detail.ten = name;
    districts_detail.dien_tich = 3200000;
    districts_detail.xa = [];
    districts_detail.phuong = [];

    for (let i = 0; i < Math.floor(Math.random() * 10); i++) {
        districts_detail.xa.push(communes[Math.floor(Math.random()*communes.length)]);
    }

    for (let i = 0; i < Math.floor(Math.random() * 10); i++) {
        districts_detail.phuong.push(communes[Math.floor(Math.random()*communes.length)]);
    }

    var district = new District(districts_detail);

    district.save( function(err) {
        if (err) {
            cb(err, null);
            return;
        }

        console.log('New District :' + district);
        districts.push(district);
        cb(null, district)
    })
}

function provinceCreate(name, cb) {
    province_detail = {}
    province_detail.ten = name;
    province_detail.dien_tich = 320000000;
    province_detail.quan = []
    province_detail.huyen = []
    province_detail.thi_xa = []
    province_detail.thanh_pho = []

    for (let i = 0; i < Math.floor(Math.random() * 5); i++) {
        province_detail.quan.push(districts[Math.floor(Math.random()*districts.length)]);
    }

    for (let i = 0; i < Math.floor(Math.random() * 5); i++) {
        province_detail.huyen.push(districts[Math.floor(Math.random()*districts.length)]);
    }

    for (let i = 0; i < Math.floor(Math.random() * 5); i++) {
        province_detail.thi_xa.push(districts[Math.floor(Math.random()*districts.length)]);
    }

    for (let i = 0; i < Math.floor(Math.random() * 5); i++) {
        province_detail.thanh_pho.push(districts[Math.floor(Math.random()*districts.length)]);
    }

    var province = new Province(province_detail);

    province.save( function(err) {
        if (err) {
            cb(err, null);
            return;
        }

        console.log('New Family:' + province);
        provinces.push(province)
        cb(null, province)
    })
}

function createJobs(cb) {
    async.parallel([
        function(callback) {
            jobCreate('Bà vú', callback);
        },
        function(callback) {
            jobCreate('Bác sĩ', callback);
        },
        function(callback) {
            jobCreate('Bảo mẫu', callback);
        },
        function(callback) {
            jobCreate('Bệnh nghề nghiệp', callback);
        },
        function(callback) {
            jobCreate('Bồi bàn', callback);
        },
        function(callback) {
            jobCreate('Caddie', callback);
        },
        function(callback) {
            jobCreate('Cán bộ', callback);
        },
        function(callback) {
            jobCreate('Cảnh sát', callback);
        },
        function(callback) {
            jobCreate('Cầu thủ bóng đá', callback);
        },
        function(callback) {
            jobCreate('Chuyên viên', callback);
        },
        function(callback) {
            jobCreate('Công chức', callback);
        },
        function(callback) {
            jobCreate('Công chứng viên', callback);
        },
        function(callback) {
            jobCreate('Công nhân', callback);
        },
        function(callback) {
            jobCreate('Công tác xã hội', callback);
        },
        function(callback) {
            jobCreate('Cửa hàng tiện lợi', callback);
        },
        function(callback) {
            jobCreate('Diễn viên', callback);
        },
        function(callback) {
            jobCreate('Diễn viên võ thuật', callback);
        },
        function(callback) {
            jobCreate('Dược sĩ', callback);
        },
        function(callback) {
            jobCreate('Đao phủ', callback);
        },
        function(callback) {
            jobCreate('Đầu bếp', callback);
        },
        function(callback) {
            jobCreate('Điều dưỡng viên', callback);
        },
        function(callback) {
            jobCreate('Điêu khắc đá', callback);
        },
        function(callback) {
            jobCreate('Gia sư', callback);
        },
        function(callback) {
            jobCreate('Giám đốc (doanh nghiệp)', callback);
        },
        function(callback) {
            jobCreate('Giám thị', callback);
        },
        function(callback) {
            jobCreate('Giảng viên', callback);
        },
        function(callback) {
            jobCreate('Huấn luyện viên', callback);
        },
        function(callback) {
            jobCreate('Khảo sát xây dựng', callback);
        },
        function(callback) {
            jobCreate('Kiến trúc sư', callback);
        },
        function(callback) {
            jobCreate('Kỹ sư tư vấn giám sát', callback);
        },
        function(callback) {
            jobCreate('Kỹ thuật hệ thống', callback);
        },
        function(callback) {
            jobCreate('Lao công', callback);
        },
        function(callback) {
            jobCreate('Lập trình viên', callback);
        },
        function(callback) {
            jobCreate('Luật sư', callback);
        },
        function(callback) {
            jobCreate('Mại dâm', callback);
        },
        function(callback) {
            jobCreate('Nghề nghiệp', callback);
        },
        function(callback) {
            jobCreate('Nghề tính toán bảo hiểm', callback);
        },
        function(callback) {
            jobCreate('Người bào chữa', callback);
        },
        function(callback) {
            jobCreate('Người dẫn chương trình', callback);
        },
        function(callback) {
            jobCreate('Người giết mổ gia súc', callback);
        },
        function(callback) {
            jobCreate('Người giúp việc', callback);
        },
        function(callback) {
            jobCreate('Người hâm mộ', callback);
        },
        function(callback) {
            jobCreate('Người mẫu', callback);
        },
        function(callback) {
            jobCreate('Người mẫu ảnh', callback);
        },
        function(callback) {
            jobCreate('Người mẫu quảng cáo', callback);
        },
        function(callback) {
            jobCreate('Nhà làm phim', callback);
        },
        function(callback) {
            jobCreate('Nhân viên pha cà phê', callback);
        },
        function(callback) {
            jobCreate('Nhiếp ảnh gia', callback);
        },
        function(callback) {
            jobCreate('Nữ tu', callback);
        },
        function(callback) {
            jobCreate('Phóng viên truyền hình', callback);
        },
        function(callback) {
            jobCreate('Quản lý xây dựng', callback);
        },
        function(callback) {
            jobCreate('Quân sư', callback);
        },
        function(callback) {
            jobCreate('Siêu sao', callback);
        },
        function(callback) {
            jobCreate('Socialite', callback);
        },
        function(callback) {
            jobCreate('Thằng mõ', callback);
        },
        function(callback) {
            jobCreate('Tài tử', callback);
        },
        function(callback) {
            jobCreate('Thám tử tư', callback);
        },
        function(callback) {
            jobCreate('Thiết kế xây dựng', callback);
        },
        function(callback) {
            jobCreate('Thợ hồ', callback);
        },
        function(callback) {
            jobCreate('Thợ may', callback);
        },
        function(callback) {
            jobCreate('Thợ máy', callback);
        },
        function(callback) {
            jobCreate('Thợ mỏ', callback);
        },
        function(callback) {
            jobCreate('Thợ rèn sắt', callback);
        },
        function(callback) {
            jobCreate('Thợ xây', callback);
        },
        function(callback) {
            jobCreate('Thủ thư', callback);
        },
        function(callback) {
            jobCreate('Thư ký', callback);
        },
        function(callback) {
            jobCreate('Thừa phát lại', callback);
        },
        function(callback) {
            jobCreate('Tiệm tạp hóa', callback);
        },
        function(callback) {
            jobCreate('Tổng thầu xây dựng', callback);
        },
        function(callback) {
            jobCreate('Trợ giúp viên pháp lý', callback);
        },
        function(callback) {
            jobCreate('Trưởng làng', callback);
        },
        function(callback) {
            jobCreate('Tuyên truyền viên', callback);
        },
        function(callback) {
            jobCreate('Tứ dân', callback);
        },
        function(callback) {
            jobCreate('Tư tế', callback);
        },
        function(callback) {
            jobCreate('Tư vấn xây dựng', callback);
        },
        function(callback) {
            jobCreate('Võ sĩ giác đấu', callback);
        },
        function(callback) {
            jobCreate('Xe ôm', callback);
        }
    ],
    cb)
}

function createIdentifications(cb) {
    async.parallel([
        function(callback) {
            identificationCreate('0', callback);
        },
        function(callback) {
            identificationCreate('1', callback);
        },
        function(callback) {
            identificationCreate('2', callback);
        },
        function(callback) {
            identificationCreate('3', callback);
        },
        function(callback) {
            identificationCreate('4', callback);
        },
        function(callback) {
            identificationCreate('5', callback);
        },
        function(callback) {
            identificationCreate('6', callback);
        },
        function(callback) {
            identificationCreate('7', callback);
        },
        function(callback) {
            identificationCreate('8', callback);
        },
        function(callback) {
            identificationCreate('9', callback);
        },
        function(callback) {
            identificationCreate('10', callback);
        },
        function(callback) {
            identificationCreate('11', callback);
        },
        function(callback) {
            identificationCreate('12', callback);
        },
        function(callback) {
            identificationCreate('13', callback);
        },
        function(callback) {
            identificationCreate('14', callback);
        },
        function(callback) {
            identificationCreate('15', callback);
        },
        function(callback) {
            identificationCreate('16', callback);
        },
        function(callback) {
            identificationCreate('17', callback);
        },
        function(callback) {
            identificationCreate('18', callback);
        },
        function(callback) {
            identificationCreate('19', callback);
        },
        function(callback) {
            identificationCreate('20', callback);
        },
        function(callback) {
            identificationCreate('21', callback);
        },
        function(callback) {
            identificationCreate('22', callback);
        },
        function(callback) {
            identificationCreate('23', callback);
        },
        function(callback) {
            identificationCreate('24', callback);
        },
        function(callback) {
            identificationCreate('25', callback);
        },
        function(callback) {
            identificationCreate('26', callback);
        },
        function(callback) {
            identificationCreate('27', callback);
        },
        function(callback) {
            identificationCreate('28', callback);
        },
        function(callback) {
            identificationCreate('29', callback);
        },
        function(callback) {
            identificationCreate('30', callback);
        },
        function(callback) {
            identificationCreate('31', callback);
        },
        function(callback) {
            identificationCreate('32', callback);
        },
        function(callback) {
            identificationCreate('33', callback);
        },
        function(callback) {
            identificationCreate('34', callback);
        },
        function(callback) {
            identificationCreate('35', callback);
        },
        function(callback) {
            identificationCreate('36', callback);
        },
        function(callback) {
            identificationCreate('37', callback);
        },
        function(callback) {
            identificationCreate('38', callback);
        },
        function(callback) {
            identificationCreate('39', callback);
        },
        function(callback) {
            identificationCreate('40', callback);
        },
        function(callback) {
            identificationCreate('41', callback);
        },
        function(callback) {
            identificationCreate('42', callback);
        },
        function(callback) {
            identificationCreate('43', callback);
        },
        function(callback) {
            identificationCreate('44', callback);
        },
        function(callback) {
            identificationCreate('45', callback);
        },
        function(callback) {
            identificationCreate('46', callback);
        },
        function(callback) {
            identificationCreate('47', callback);
        },
        function(callback) {
            identificationCreate('48', callback);
        },
        function(callback) {
            identificationCreate('49', callback);
        },
        function(callback) {
            identificationCreate('50', callback);
        },
        function(callback) {
            identificationCreate('51', callback);
        },
        function(callback) {
            identificationCreate('52', callback);
        },
        function(callback) {
            identificationCreate('53', callback);
        },
        function(callback) {
            identificationCreate('54', callback);
        },
        function(callback) {
            identificationCreate('55', callback);
        },
        function(callback) {
            identificationCreate('56', callback);
        },
        function(callback) {
            identificationCreate('57', callback);
        },
        function(callback) {
            identificationCreate('58', callback);
        },
        function(callback) {
            identificationCreate('59', callback);
        },
        function(callback) {
            identificationCreate('60', callback);
        },
        function(callback) {
            identificationCreate('61', callback);
        },
        function(callback) {
            identificationCreate('62', callback);
        },
        function(callback) {
            identificationCreate('63', callback);
        },
        function(callback) {
            identificationCreate('64', callback);
        },
        function(callback) {
            identificationCreate('65', callback);
        },
        function(callback) {
            identificationCreate('66', callback);
        },
        function(callback) {
            identificationCreate('67', callback);
        },
        function(callback) {
            identificationCreate('68', callback);
        },
        function(callback) {
            identificationCreate('69', callback);
        },
        function(callback) {
            identificationCreate('70', callback);
        },
        function(callback) {
            identificationCreate('71', callback);
        },
        function(callback) {
            identificationCreate('72', callback);
        },
        function(callback) {
            identificationCreate('73', callback);
        },
        function(callback) {
            identificationCreate('74', callback);
        },
        function(callback) {
            identificationCreate('75', callback);
        },
        function(callback) {
            identificationCreate('76', callback);
        },
        function(callback) {
            identificationCreate('77', callback);
        },
        function(callback) {
            identificationCreate('78', callback);
        },
        function(callback) {
            identificationCreate('79', callback);
        },
        function(callback) {
            identificationCreate('80', callback);
        },
        function(callback) {
            identificationCreate('81', callback);
        },
        function(callback) {
            identificationCreate('82', callback);
        },
        function(callback) {
            identificationCreate('83', callback);
        },
        function(callback) {
            identificationCreate('84', callback);
        },
        function(callback) {
            identificationCreate('85', callback);
        },
        function(callback) {
            identificationCreate('86', callback);
        },
        function(callback) {
            identificationCreate('87', callback);
        },
        function(callback) {
            identificationCreate('88', callback);
        },
        function(callback) {
            identificationCreate('89', callback);
        },
        function(callback) {
            identificationCreate('90', callback);
        },
        function(callback) {
            identificationCreate('91', callback);
        },
        function(callback) {
            identificationCreate('92', callback);
        },
        function(callback) {
            identificationCreate('93', callback);
        },
        function(callback) {
            identificationCreate('94', callback);
        },
        function(callback) {
            identificationCreate('95', callback);
        },
        function(callback) {
            identificationCreate('96', callback);
        },
        function(callback) {
            identificationCreate('97', callback);
        },
        function(callback) {
            identificationCreate('98', callback);
        },
        function(callback) {
            identificationCreate('99', callback);
        },
        function(callback) {
            identificationCreate('100', callback);
        },
        function(callback) {
            identificationCreate('101', callback);
        },
        function(callback) {
            identificationCreate('102', callback);
        },
        function(callback) {
            identificationCreate('103', callback);
        },
        function(callback) {
            identificationCreate('104', callback);
        },
        function(callback) {
            identificationCreate('105', callback);
        },
        function(callback) {
            identificationCreate('106', callback);
        },
        function(callback) {
            identificationCreate('107', callback);
        },
        function(callback) {
            identificationCreate('108', callback);
        },
        function(callback) {
            identificationCreate('109', callback);
        },
        function(callback) {
            identificationCreate('110', callback);
        },
        function(callback) {
            identificationCreate('111', callback);
        },
        function(callback) {
            identificationCreate('112', callback);
        },
        function(callback) {
            identificationCreate('113', callback);
        },
        function(callback) {
            identificationCreate('114', callback);
        },
        function(callback) {
            identificationCreate('115', callback);
        },
        function(callback) {
            identificationCreate('116', callback);
        },
        function(callback) {
            identificationCreate('117', callback);
        },
        function(callback) {
            identificationCreate('118', callback);
        },
        function(callback) {
            identificationCreate('119', callback);
        },
        function(callback) {
            identificationCreate('120', callback);
        },
        function(callback) {
            identificationCreate('121', callback);
        },
        function(callback) {
            identificationCreate('122', callback);
        },
        function(callback) {
            identificationCreate('123', callback);
        },
        function(callback) {
            identificationCreate('124', callback);
        },
        function(callback) {
            identificationCreate('125', callback);
        },
        function(callback) {
            identificationCreate('126', callback);
        },
        function(callback) {
            identificationCreate('127', callback);
        },
        function(callback) {
            identificationCreate('128', callback);
        },
        function(callback) {
            identificationCreate('129', callback);
        },
        function(callback) {
            identificationCreate('130', callback);
        },
        function(callback) {
            identificationCreate('131', callback);
        },
        function(callback) {
            identificationCreate('132', callback);
        },
        function(callback) {
            identificationCreate('133', callback);
        },
        function(callback) {
            identificationCreate('134', callback);
        },
        function(callback) {
            identificationCreate('135', callback);
        },
        function(callback) {
            identificationCreate('136', callback);
        },
        function(callback) {
            identificationCreate('137', callback);
        },
        function(callback) {
            identificationCreate('138', callback);
        },
        function(callback) {
            identificationCreate('139', callback);
        },
        function(callback) {
            identificationCreate('140', callback);
        },
        function(callback) {
            identificationCreate('141', callback);
        },
        function(callback) {
            identificationCreate('142', callback);
        },
        function(callback) {
            identificationCreate('143', callback);
        },
        function(callback) {
            identificationCreate('144', callback);
        },
        function(callback) {
            identificationCreate('145', callback);
        },
        function(callback) {
            identificationCreate('146', callback);
        },
        function(callback) {
            identificationCreate('147', callback);
        },
        function(callback) {
            identificationCreate('148', callback);
        },
        function(callback) {
            identificationCreate('149', callback);
        },
        function(callback) {
            identificationCreate('150', callback);
        },
        function(callback) {
            identificationCreate('151', callback);
        },
        function(callback) {
            identificationCreate('152', callback);
        },
        function(callback) {
            identificationCreate('153', callback);
        },
        function(callback) {
            identificationCreate('154', callback);
        },
        function(callback) {
            identificationCreate('155', callback);
        },
        function(callback) {
            identificationCreate('156', callback);
        },
        function(callback) {
            identificationCreate('157', callback);
        },
        function(callback) {
            identificationCreate('158', callback);
        },
        function(callback) {
            identificationCreate('159', callback);
        },
        function(callback) {
            identificationCreate('160', callback);
        },
        function(callback) {
            identificationCreate('161', callback);
        },
        function(callback) {
            identificationCreate('162', callback);
        },
        function(callback) {
            identificationCreate('163', callback);
        },
        function(callback) {
            identificationCreate('164', callback);
        },
        function(callback) {
            identificationCreate('165', callback);
        },
        function(callback) {
            identificationCreate('166', callback);
        },
        function(callback) {
            identificationCreate('167', callback);
        },
        function(callback) {
            identificationCreate('168', callback);
        },
        function(callback) {
            identificationCreate('169', callback);
        },
        function(callback) {
            identificationCreate('170', callback);
        },
        function(callback) {
            identificationCreate('171', callback);
        },
        function(callback) {
            identificationCreate('172', callback);
        },
        function(callback) {
            identificationCreate('173', callback);
        },
        function(callback) {
            identificationCreate('174', callback);
        },
        function(callback) {
            identificationCreate('175', callback);
        },
        function(callback) {
            identificationCreate('176', callback);
        },
        function(callback) {
            identificationCreate('177', callback);
        },
        function(callback) {
            identificationCreate('178', callback);
        },
        function(callback) {
            identificationCreate('179', callback);
        },
        function(callback) {
            identificationCreate('180', callback);
        },
        function(callback) {
            identificationCreate('181', callback);
        },
        function(callback) {
            identificationCreate('182', callback);
        },
        function(callback) {
            identificationCreate('183', callback);
        },
        function(callback) {
            identificationCreate('184', callback);
        },
        function(callback) {
            identificationCreate('185', callback);
        },
        function(callback) {
            identificationCreate('186', callback);
        },
        function(callback) {
            identificationCreate('187', callback);
        },
        function(callback) {
            identificationCreate('188', callback);
        },
        function(callback) {
            identificationCreate('189', callback);
        },
        function(callback) {
            identificationCreate('190', callback);
        },
        function(callback) {
            identificationCreate('191', callback);
        },
        function(callback) {
            identificationCreate('192', callback);
        },
        function(callback) {
            identificationCreate('193', callback);
        },
        function(callback) {
            identificationCreate('194', callback);
        },
        function(callback) {
            identificationCreate('195', callback);
        },
        function(callback) {
            identificationCreate('196', callback);
        },
        function(callback) {
            identificationCreate('197', callback);
        },
        function(callback) {
            identificationCreate('198', callback);
        },
        function(callback) {
            identificationCreate('199', callback);
        }
    ],
    cb)
}

function createFamilies(cb) {
    async.parallel([
        function(callback) {
            familyCreate(callback);
        },
        function(callback) {
            familyCreate(callback);
        },
        function(callback) {
            familyCreate(callback);
        },
        function(callback) {
            familyCreate(callback);
        },
        function(callback) {
            familyCreate(callback);
        },
        function(callback) {
            familyCreate(callback);
        },
        function(callback) {
            familyCreate(callback);
        },
        function(callback) {
            familyCreate(callback);
        },
        function(callback) {
            familyCreate(callback);
        },
        function(callback) {
            familyCreate(callback);
        },
        function(callback) {
            familyCreate(callback);
        },
        function(callback) {
            familyCreate(callback);
        },
        function(callback) {
            familyCreate(callback);
        },
        function(callback) {
            familyCreate(callback);
        },
        function(callback) {
            familyCreate(callback);
        },
        function(callback) {
            familyCreate(callback);
        },
        function(callback) {
            familyCreate(callback);
        },
        function(callback) {
            familyCreate(callback);
        },
        function(callback) {
            familyCreate(callback);
        },
        function(callback) {
            familyCreate(callback);
        }
    ],
    cb)
}

function createCommunes(cb) {
    async.parallel([
        function(callback) {
            communeCreate('Khánh An', callback);
        },
        function(callback) {
            communeCreate('Khánh Công', callback);
        },
        function(callback) {
            communeCreate('Khánh Cư', callback);
        },
        function(callback) {
            communeCreate('Khánh Cường', callback);
        },
        function(callback) {
            communeCreate('Khánh Hải', callback);
        },
        function(callback) {
            communeCreate('Khánh Hòa', callback);
        },
        function(callback) {
            communeCreate('Khánh Hội', callback);
        },
        function(callback) {
            communeCreate('Khánh Hồng', callback);
        },
        function(callback) {
            communeCreate('Khánh Lợi', callback);
        },
        function(callback) {
            communeCreate('Khánh Mậu', callback);
        },
        function(callback) {
            communeCreate('Khánh Nhạc', callback);
        },
        function(callback) {
            communeCreate('Khánh Phú', callback);
        },
        function(callback) {
            communeCreate('Khánh Thành', callback);
        },
        function(callback) {
            communeCreate('Khánh Thiện', callback);
        },
        function(callback) {
            communeCreate('Khánh Thủy', callback);
        },
        function(callback) {
            communeCreate('Khánh Tiên', callback);
        },
        function(callback) {
            communeCreate('Khánh Trung', callback);
        },
        function(callback) {
            communeCreate('Khánh Vân', callback);
        }
    ],
    cb)
}

function createDistricts(cb) {
    async.parallel([
        function(callback) {
            districtCreate('thành phố Ninh Bình', callback);
        },
        function(callback) {
            districtCreate('Gia Viễn', callback);
        },
        function(callback) {
            districtCreate('Hoa Lư', callback);
        },
        function(callback) {
            districtCreate('Kim Sơn', callback);
        },
        function(callback) {
            districtCreate('Nho Quan', callback);
        },
        function(callback) {
            districtCreate('thành phố Tam Điệp', callback);
        },
        function(callback) {
            districtCreate('Yên Khánh', callback);
        },
        function(callback) {
            districtCreate('Yên Mô', callback);
        }
    ],
    cb)
}

function createProvinces(cb) {
    async.parallel([
        function(callback) {
            provinceCreate('An Giang', callback);
        },
        function(callback) {
            provinceCreate('Bà Rịa Vũng Tàu', callback);
        },
        function(callback) {
            provinceCreate('Bắc Giang', callback);
        },
        function(callback) {
            provinceCreate('Bắc Kạn', callback);
        },
        function(callback) {
            provinceCreate('Bạc Liêu', callback);
        },
        function(callback) {
            provinceCreate('Bắc Ninh', callback);
        },
        function(callback) {
            provinceCreate('Bến Tre', callback);
        },
        function(callback) {
            provinceCreate('Bình Định', callback);
        },
        function(callback) {
            provinceCreate('Bình Dương', callback);
        },
        function(callback) {
            provinceCreate('Bình Phước', callback);
        },
        function(callback) {
            provinceCreate('Bình Thuận', callback);
        },
        function(callback) {
            provinceCreate('Cà Mau', callback);
        },
        function(callback) {
            provinceCreate('Cao Bằng', callback);
        },
        function(callback) {
            provinceCreate('Đắk Lắk', callback);
        },
        function(callback) {
            provinceCreate('Đắk Nông', callback);
        },
        function(callback) {
            provinceCreate('Điện Biên', callback);
        },
        function(callback) {
            provinceCreate('Đồng Nai', callback);
        },
        function(callback) {
            provinceCreate('Đồng Tháp', callback);
        },
        function(callback) {
            provinceCreate('Gia Lai', callback);
        },
        function(callback) {
            provinceCreate('Hà Giang', callback);
        },
        function(callback) {
            provinceCreate('Hà Nam', callback);
        },
        function(callback) {
            provinceCreate('Hà Tĩnh', callback);
        },
        function(callback) {
            provinceCreate('Hải Dương', callback);
        },
        function(callback) {
            provinceCreate('Hậu Giang', callback);
        },
        function(callback) {
            provinceCreate('Hòa Bình', callback);
        },
        function(callback) {
            provinceCreate('Hưng Yên', callback);
        },
        function(callback) {
            provinceCreate('Khánh Hòa', callback);
        },
        function(callback) {
            provinceCreate('Kiên Giang', callback);
        },
        function(callback) {
            provinceCreate('Kon Tum', callback);
        },
        function(callback) {
            provinceCreate('Lai Châu', callback);
        },
        function(callback) {
            provinceCreate('Lâm Đồng', callback);
        },
        function(callback) {
            provinceCreate('Lạng Sơn', callback);
        },
        function(callback) {
            provinceCreate('Lào Cai', callback);
        },
        function(callback) {
            provinceCreate('Long An', callback);
        },
        function(callback) {
            provinceCreate('Nam Định', callback);
        },
        function(callback) {
            provinceCreate('Nghệ An', callback);
        },
        function(callback) {
            provinceCreate('Ninh Bình', callback);
        },
        function(callback) {
            provinceCreate('Ninh Thuận', callback);
        },
        function(callback) {
            provinceCreate('Phú Thọ', callback);
        },
        function(callback) {
            provinceCreate('Quảng Bình', callback);
        },
        function(callback) {
            provinceCreate('Quảng Nam', callback);
        },
        function(callback) {
            provinceCreate('Quảng Ngãi', callback);
        },
        function(callback) {
            provinceCreate('Quảng Ninh', callback);
        },
        function(callback) {
            provinceCreate('Quảng Trị', callback);
        },
        function(callback) {
            provinceCreate('Sóc Trăng', callback);
        },
        function(callback) {
            provinceCreate('Sơn La', callback);
        },
        function(callback) {
            provinceCreate('Tây Ninh', callback);
        },
        function(callback) {
            provinceCreate('Thái Bình', callback);
        },
        function(callback) {
            provinceCreate('Thái Nguyên', callback);
        },
        function(callback) {
            provinceCreate('Thanh Hóa', callback);
        },
        function(callback) {
            provinceCreate('Thừa Thiên Huế', callback);
        },
        function(callback) {
            provinceCreate('Tiền Giang', callback);
        },
        function(callback) {
            provinceCreate('Trà Vinh', callback);
        },
        function(callback) {
            provinceCreate('Tuyên Quang', callback);
        },
        function(callback) {
            provinceCreate('Vĩnh Long', callback);
        },
        function(callback) {
            provinceCreate('Vĩnh Phúc', callback);
        },
        function(callback) {
            provinceCreate('Yên Bái', callback);
        },
        function(callback) {
            provinceCreate('Phú Yên', callback);
        },
        function(callback) {
            provinceCreate('Cần Thơ', callback);
        },
        function(callback) {
            provinceCreate('Đà Nẵng', callback);
        },
        function(callback) {
            provinceCreate('Hải Phòng', callback);
        },
        function(callback) {
            provinceCreate('Hà Nội', callback);
        },
        function(callback) {
            provinceCreate('TP HCM', callback);
        }
    ],
    cb)
}

async.series([
    createJobs,
    createIdentifications,
    createFamilies,
    createCommunes,
    createDistricts,
    createProvinces
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    // All done, disconnect from database
    mongoose.connection.close();
});