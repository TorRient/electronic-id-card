#! /usr/bin/env node

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
mongoose.connect(mongoDB, {useNewUrlParser});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connect error:'));

var identification_card = []
var family = []
var commune = []
var district = []
var province = []
var job = []

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function identificationCreate(count) {
    identification.so_cmt = '00000000' + count;
    identification.ten = 'Nguyễn Văn Minh ' + count;
    identification.ngay_sinh = randomDate(new Date(1990, 0, 1), new Date());

    if (Math.random() > 0.5) {
        identification.ngay_mat = randomDate(new Date(2050, 0, 1), new Date(2100, 0, 1));
    }

    identification.nguyen_quan = 'Ninh Bình';
    identification.thuong_tru = 'Ninh Bình';
    identification.tam_tru = 'Ninh Bình';
    identification.dan_toc = 'Kinh';
    identification.ton_giao = 'Không';
    identification.dau_vet_rieng_va_di_hinh = 'Không';
    identification.ngay_cap = new Date(2030, 0, 1);
    identification.anh_chan_dung = './img_identification/' + count + '.jpg';
    identification.anh_cmt_truoc = './img_identification/' + count + '.jpg';
    identification.anh_cmt_sau = './img_identification/' + count + '.jpg';
    
}

