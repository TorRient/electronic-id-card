var random =  require('./random') ;
var identificationcards = require('../models/identification_card');
var nghe_nghiep = require('./nghe_nghiep') ;
var ton_giao = require('./ton_giao') ;
var dan_toc = require('./dan_toc') ;
var province = require('../models/province') ;

exports.run = async function(req,res,next){
    res.send("Đang tiến hành tạo dữ liệu .....");
    var list_population = await make_person(20000) ;
    try {
        identificationcards.create(list_population);
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

//Hàm này trả về một mảng các đối tượng json kiểu identification_card
async function make_person(population){
    var list_population = [] ;
    var girl = Math.round(0.49*population) ;
    var boy = population - girl ;
    var list_province = await province.find() ;
    var address = random.get_address(list_province);

    for (let i = 0; i < boy ; i++) {
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
