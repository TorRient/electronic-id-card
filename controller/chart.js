var chart = require('../models/chart');
// module này dùng để đọc ghi file
var fs = require('fs');

// hàm chạy thống kê và lưu vào một file kết quả
exports.run_statistic = async function(req,res){
    var time_start = (new Date()).getTime() ;
    var provinces = await exports.load_province() ;
    // All là đại diện cho cả nước
    provinces.push("All") ;
    var result = {} ;

    var number_p = provinces.length ;

    var list_person ;
    var statistic_result ;
    var percent_age;
    var percent_jobs;
    var percent_religious ;
    var text;

    var date = new Date();
    var yyyy = date.getFullYear();
    var mm = date.getMonth() + 1 ;
    var dd = date.getDate() ;
    var date_statistic = String(dd) + "-" + String(mm) + "-" + String(yyyy) ; 
    var population_of_province = {} ;
    for (let index = 0; index < number_p; index++) {
        list_person = await chart.select_person_by_area(provinces[index]);
        statistic_result = await exports.statistics(list_person,provinces[index]) ;
        percent_age = exports.percent_age(list_person);
        percent_jobs = exports.percent_jobs(list_person);
        percent_religious = exports.percent_religious(list_person);
        text = JSON.stringify({
            "statistic_result" : statistic_result ,
            "percent_age" : percent_age ,
            "percent_jobs" : percent_jobs ,
            "percent_religious" : percent_religious ,
            "date_statistic" : date_statistic
        }) ;
        result[String((index+1)%number_p)] = text ;
        population_of_province[provinces[index]] = list_person.length ;       
    }

    try {
        fs.writeFileSync('./models/result_statistic.json',JSON.stringify(result),'utf8');
        fs.writeFileSync('./public/population_of_province.json',JSON.stringify(population_of_province),'utf8');
    } catch (error) {
        console.log(error);
    }

    var time_end = (new Date()).getTime() ;
    var time = time_end - time_start ;
    console.log('Tổng thời gian chạy là : ') ;
    console.log(time) ;
    var province_id = String(req.body["province_id"]);
    var result = await exports.load_result(province_id);
    var statistics = JSON.parse(result.statistic_result) ;
    var percent_age = result.percent_age ;
    var percent_jobs = result.percent_jobs ;
    var percent_religious = result.percent_religious ;
    var date_statistic = result.date_statistic ;
    res.send({
        statistic : statistics,
        percent_age : percent_age,
        percent_jobs : percent_jobs,
        percent_religious : percent_religious,
        date_statistic : date_statistic 
    })
}
// hàm load dữ liệu thống kê trả về một file json chứa tất cả kết quả

exports.load_result = async function(province_id){
    var text = fs.readFileSync('./models/result_statistic.json') ;
    result = JSON.parse(text.toString());
    return JSON.parse(result[province_id]);
}

exports.load_province = async function(){
    var texts = await fs.readFileSync('./models/provinces.txt','utf8') ;
    var provinces = texts.toString().split(",") ;
    return provinces ;
}


// hàm này gửi đển client một đối tượng json chứa tỷ lệ dân số theo độ tuổi
exports.percent_age = function(list_person){
    // đếm người theo độ tuổi
    var percent_age = chart.extract_percent_age(list_person) ;
    // tính tỷ lệ người trong độ tuổi lao động
    var percent_working_gender = chart.percent_working_gender(percent_age) ;
    // phần tử cuối cùng của đối tượng percent_age trả về là một mảng chứ tỷ lệ người trong độ tuổi lao động , tỷ lệ nam , nữ
    percent_age["percent_working_gender"] = percent_working_gender ;
    return JSON.stringify(percent_age) ;
    
}

exports.percent_jobs = function(list_person){
    var percent_jobs = chart.extract_percent_jobs(list_person);
    return JSON.stringify(percent_jobs) ;
}

exports.percent_religious = function(list_person){
    var percent_religious = chart.extract_percent_religious(list_person);
    return JSON.stringify(percent_religious) ;
}

exports.statistics = async function(list_person,province){
	var average_age = await exports.average_age(list_person);
    var poor_family = await exports.poor_family(province);
    var percent_poor_family = poor_family[0] ;
	var poor_familys = poor_family[1] ;
	return JSON.stringify({"average_age" : average_age ,"percent_poor_family" : percent_poor_family,"poor_familys" : poor_familys}) ;
}

// tính tổng dân số 
// hàm này không dùng vì nếu dùng thì lượng dân số có trong database ít quá
exports.count_person_by_area = async function(req,res){
    var provinces = await exports.load_province() ;
    // All là đại diện cho cả nước
    provinces.push("All") ;
    var count ;
    var population_of_province = {} ;
    for (let index = 0; index < provinces.length ; index++) {
        count = await chart.count_person_by_area(provinces[index]) ;
        population_of_province[provinces[index]] = count ;
    } ;
    try {
        fs.writeFileSync('./public/population_of_province.json',JSON.stringify(population_of_province),'utf8');
    } catch (error) {
        console.log(error);
    }

    res.send(population_of_province) ;
    return population_of_province ;
}
 exports.load_population_of_province = async function(req,res){
    var texts = await fs.readFileSync('./public/population_of_province.json','utf8') ;
    res.send(JSON.parse(texts) )
    return JSON.parse(texts) ;
 }
// tính tuổi trung bình
exports.average_age = function(list_person){
	var total_population = list_person.length ;
	var sum_age = 0 ;
	list_person.forEach(person => {
		sum_age += person.tuoi ;
	});
	var average_age = Math.round((sum_age/total_population)*100)/100 ;
	return average_age ;
}

// hàm tính tỷ lệ hộ nghèo
exports.poor_family = async function(province){
	var total_family = await chart.count_family(false,province);
	var poor_familys = await chart.count_family(true,province);
	var percent_poor_family = Math.round((poor_familys/total_family)*10000)/100;
	return [percent_poor_family,poor_familys] ;
}

// test ajax
exports.load_ajax = async function(req,res){
    console.log(String(req.body["province_id"])) ;
    var province_id = String(req.body["province_id"]);
    var result = await exports.load_result(province_id);
    var statistics = JSON.parse(result.statistic_result) ;
    var percent_age = result.percent_age ;
    var percent_jobs = result.percent_jobs ;
    var percent_religious = result.percent_religious ;
    var date_statistic = result.date_statistic ;
    res.send({
        statistic : statistics,
        percent_age : percent_age,
        percent_jobs : percent_jobs,
        percent_religious : percent_religious,
        date_statistic : date_statistic
    })
}