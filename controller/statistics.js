var statistic = require('../models/statistic');

// tìm kiếm một người theo số chứng minh thư
exports.find_person_by_id = function(req,res,next){
    statistic.find_person_by_id(111111114,function(person){
		res.send(person);
        res.end();
    });
    
};

exports.statistics = async function(province){
	var average_age = await exports.average_age(province);
	var percent_poor_family = await exports.poor_family();
	var poor_familys = await statistic.count_family(true);
	return JSON.stringify({"average_age" : average_age ,"percent_poor_family" : percent_poor_family,"poor_familys" : poor_familys}) ;
}

// tính tổng dân số
exports.count_person_by_area = async function(req,res,province,next){
	var total_population = await statistic.count_person_by_area(province) ;
	console.log('tổng dân số là : ' + total_population);
	res.send('hihi world');
	res.end();
}

// tính tuổi trung bình
exports.average_age = async function(province){
	var total_population = await statistic.count_person_by_area(province) ;
	var list_population = await statistic.select_person_by_area(province);
	var sum_age = 0 ;
	list_population.forEach(person => {
		sum_age += person.tuoi ;
	});
	var average_age = await Math.round((sum_age/total_population)*100)/100 ;
	return average_age ;
}

// hàm tính tỷ lệ hộ nghèo
exports.poor_family = async function(){
	var total_family = await statistic.count_family(false);
	var poor_familys = await statistic.count_family(true);
	var percent_poor_family = Math.round((poor_familys/total_family)*10000)/100;
	return percent_poor_family ;
}

// exports.poor_family = function(req,res,next){
// 	statistic.count_family(false,function(total_family){
// 		statistic.count_family(true,function(poor_familys){
// 			var percent_poor_family = Math.round((poor_familys/total_family)*10000)/100;
// 			console.log('tỷ lệ hộ nghèo là : ' + percent_poor_family);
// 			res.send('hihi');
// 			res.end();
// 		})
// 	})
// }