var identificationcards = require('../models/identification_card');
var family = require('../models/family');

// hàm này chỉ mục đích test
exports.count_girl = function(callback){
	identificationcards.countDocuments({gioi_tinh : "Nữ"},function(err,count){
		if (err) {
			console.log(err) ;
		} else {
			callback(count) ;
		}		
	}) ;
};


// hàm này tìm kiếm một người theo chứng minh thư
exports.find_person_by_id = function(so_cmt,callback){
	identificationcards.findOne({so_cmt : so_cmt},function(err,person){
		if (err) {
			console.log(err) ;
		} else {
			callback(person) ;
		}		
	}) ;
};

// hàm này trả về danh sách tất cả dân sổ của 1 tỉnh , nếu tham số tỉnh bằng null thì nó sẽ lấy của cả nước
exports.select_person_by_area = async function(province){
    var list_person ;
    if (province === null) {
        try {
            list_person = await identificationcards.find();
        } catch (error) {
            console.log(error);
        }        
    } else {
        try {
            list_person = await identificationcards.find({thuong_tru : province});
        } catch (error) {
            console.log(error);
        }
    }
    return list_person ;
}

// hàm này đếm số dân của 1 tỉnh , nếu tham số tỉnh bằng null thì nó sẽ đếm dân số của cả nước
exports.count_person_by_area = async function(province){
    var counts ;
	if (province === null) {
        try {
            counts = await identificationcards.countDocuments() ;
        } catch (error) {
            console.log(error);
        }
    } else {
        try {
            counts = await identificationcards.countDocuments({thuong_tru : province});
        } catch (error) {
            console.log(error);
        }
    }
    return counts;
};

//hàm này lấy số hộ nghèo của cả nước
exports.count_family = async function(ho_ngheo,callback){
    var count ;
    // nếu hộ nghèo = false tức là sẽ lấy tổng tất cả các hộ
    if (ho_ngheo) {
        try {
            count = await family.countDocuments({ho_ngheo : ho_ngheo});
        } catch (error) {
            console.log(error);
        }    
    } else {
        try {
            count = await family.countDocuments();
        } catch (error) {
            console.log(error);
        }     
    }
    return count ;
}