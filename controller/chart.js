var chart = require('../models/chart');
var statistic = require('../models/statistic');
var statistic_c = require('./statistics');
// module này dùng để đọc ghi file
var fs = require('fs');

// hàm chạy thống kê và lưu vào một file kết quả
exports.run_statistic = async function(req,res,next){
    res.send('Đang chạy thống kê ... ') ; 
    var statistic_result = await statistic_c.statistics(null) ;
    var percent_age = await exports.percent_age();
    var percent_jobs = await exports.percent_jobs();
    var percent_religious = await exports.percent_religious();
    var date = new Date();
    var yyyy = date.getFullYear();
    var mm = date.getMonth() + 1 ;
    var dd = date.getDate() ;
    var date_statistic = String(dd) + "-" + String(mm) + "-" + String(yyyy) ; 
    
    var text = JSON.stringify({
        "statistic_result" : statistic_result ,
        "percent_age" : percent_age ,
        "percent_jobs" : percent_jobs ,
        "percent_religious" : percent_religious ,
        "date_statistic" : date_statistic
    }) ;
    fs.writeFile('./models/result_statistic.txt',text,function(err){
        if (err) {
            console.log(err);
        }
    }) ;
   
    res.send('Đã thống kê xong !');
    res.end();
}
// hàm load dữ liệu thống kê trả về một file json chứa tất cả kết quả

exports.load_result = async function(){
    var text = fs.readFileSync('./models/result_statistic.txt') ;
    result = JSON.parse(text.toString());
    return result ;
}


// hàm này gửi đển client một đối tượng json chứa tỷ lệ dân số theo độ tuổi
exports.percent_age = async function(){
    var list_person = await statistic.select_person_by_area(null);
    // đếm người theo độ tuổi
    var percent_age = await chart.extract_percent_age(list_person) ;
    // tính tỷ lệ người trong độ tuổi lao động
    var percent_working_gender = await chart.percent_working_gender(percent_age) ;
    // phần tử cuối cùng của đối tượng percent_age trả về là một mảng chứ tỷ lệ người trong độ tuổi lao động , tỷ lệ nam , nữ
    percent_age["percent_working_gender"] = percent_working_gender ;
    return JSON.stringify(percent_age) ;
    
}

exports.percent_jobs = async function(){
    var list_person = await statistic.select_person_by_area(null);
    var percent_jobs = await chart.extract_percent_jobs(list_person);

    return JSON.stringify(percent_jobs) ;
}

exports.percent_religious = async function(){
    var list_person = await statistic.select_person_by_area(null);
    var percent_religious = await chart.extract_percent_religious(list_person);
    return JSON.stringify(percent_religious) ;
}