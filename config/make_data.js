var random =  require('./random') ;
var identificationcards = require('../models/identification_card');
var nghe_nghiep = require('./nghe_nghiep') ;
var ton_giao = require('./ton_giao') ;
var dan_toc = require('./dan_toc') ;
var province = require('../models/province') ;
var family = require('../models/family') ;
var fs = require('fs');

exports.run = async function(req,res,next){
    res.send("Đang tiến hành tạo dữ liệu .....");
    var list_population = await make_person(20000) ;
    //var list_family = await make_family();
    try {
        identificationcards.create(list_population);
        //family.create(list_family);
    } catch (error) {
        console.log(error);
    }
    console.log("Hoàn thành tạo dữ liệu !");
    res.end();
}

exports.print_test = async function(req,res,next){
    var list = await make_person(3) ;
    res.send(list);
    res.end();
}

exports.get_list_province = async function(req,res,next){
    var list_province = await province.find() ;
    provinces = [] ;
    list_province.forEach(p => {
        provinces.push(p.ten) ;
    });
    provinces.sort();
    fs.writeFile('./models/provinces.txt',provinces.toString(),'utf8',function(err){
        if (err) {
            console.log(err);
        }
    }) ;
    res.send(provinces) ;
}

// hàm này trả về một mảng 1000 các đối tượng json kiểu family
async function make_family(){
    var list_family = [] ;
    var list_province = await province.find() ;
    for (let index = 0; index < 50; index++) {
        var familys = {
            chu_ho: "5caee395ebdf851fac448e2d" ,
            thanh_vien: ["5caee395ebdf851fac448e2d"] ,
            ho_ngheo: true ,
            tinh: random.get_address(list_province)
        } ;
        list_family.push(familys);
    }

    for (let index = 0; index < 950; index++) {
        var familys = {
            chu_ho: "5caee395ebdf851fac448e2d" ,
            thanh_vien: ["5caee395ebdf851fac448e2d"] ,
            ho_ngheo: false ,
            tinh: random.get_address(list_province)
        } ;
        list_family.push(familys);
    }

    return list_family ;
}

//Hàm này trả về một mảng các đối tượng json kiểu identification_card
async function make_person(population){
    var list_population = [] ;
    var girl = Math.round(0.49*population) ;
    var boy = population - girl ;
    var list_province = await province.find() ;
    var address ;

    for (let i = 0; i < boy ; i++) {
        address = random.get_address(list_province);
        var person =  {
            so_cmt: 100000000+i,
            ten: random.get_boyname() ,
            ngay_sinh: random.get_date() ,
            ngay_mat: null ,
            nguyen_quan: address ,
            thuong_tru: address ,
            tam_tru: address ,
            dan_toc: random.get_nation(dan_toc) ,
            ton_giao: random.get_religious(ton_giao) ,
            dau_vet_rieng_va_di_hinh: "" ,
            ngay_cap: new Date() ,
            anh_chan_dung: random.get_image(i) ,
            anh_cmt_truoc: random.get_image(i),
            anh_cmt_sau: random.get_image(i),
            nghe_nghiep: random.get_jobs(nghe_nghiep) ,
            gioi_tinh : "Nam"
        } ;

        list_population.push(person);
        
    }
    for (let i = boy; i < population ; i++) {
        address = random.get_address(list_province);
        var person =  {
            so_cmt: 100000000+i,
            ten: random.get_girlname() ,
            ngay_sinh: random.get_date() ,
            ngay_mat: null ,
            nguyen_quan: address ,
            thuong_tru: address ,
            tam_tru: address ,
            dan_toc: random.get_nation(dan_toc) ,
            ton_giao: random.get_religious(ton_giao) ,
            dau_vet_rieng_va_di_hinh: "" ,
            ngay_cap: new Date() ,
            anh_chan_dung: random.get_image(i) ,
            anh_cmt_truoc: random.get_image(i),
            anh_cmt_sau: random.get_image(i),
            nghe_nghiep: random.get_jobs(nghe_nghiep) ,
            gioi_tinh : "Nữ"
        } ;

        list_population.push(person);
        
    }


    return list_population ;
};
