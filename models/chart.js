var identificationcards = require('../models/identification_card');
var family = require('../models/family');

// hàm này trả về danh sách tất cả dân sổ của 1 tỉnh , nếu tham số tỉnh bằng null thì nó sẽ lấy của cả nước
exports.select_person_by_area = async function(province){
    var list_person ;
    if (province === "All") {
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
	if (province === "All") {
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

//hàm này đếm số hộ nghèo của cả nước
exports.count_family = async function(ho_ngheo,tinh){
    var count ;
    // nếu hộ nghèo = false tức là sẽ lấy tổng tất cả các hộ
    if (tinh === "All") {
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
    } else {
        if (ho_ngheo) {
            try {
                count = await family.countDocuments({ho_ngheo : ho_ngheo,tinh : tinh});
            } catch (error) {
                console.log(error);
            }    
        } else {
            try {
                count = await family.countDocuments({tinh : tinh});
            } catch (error) {
                console.log(error);
            }     
        }
    }
    return count ;
}

// biến json này lưu thông tin về số dân ở từng độ tuổi , trong mảng giái trị ở dưới thì phần tử đầu lưu nam , phần tử 2 lưu nữ
var percent_age = {
    '0_4' : [0,0] ,
    '5_9' : [0,0] ,
    '10_14' : [0,0] ,
    '15_19' : [0,0] ,
    '20_24' : [0,0] ,
    '25_29' : [0,0] ,
    '30_34' : [0,0] ,
    '35_39' : [0,0] ,
    '40_44' : [0,0] ,
    '45_49' : [0,0] ,
    '50_54' : [0,0] ,
    '55_59' : [0,0] ,
    '60_64' : [0,0] ,
    '65_69' : [0,0] ,
    '70_74' : [0,0] ,
    '75_79' : [0,0] ,
    '80_84' : [0,0],
    '>=_85' : [0,0]

} ;
// hàm này trả về một đối tượng json chứa tỷ lệ dân số theo độ tuổi
exports.extract_percent_age = function(list_person){
    list_person.forEach(person => {
        let i = 1 ;
        if(person.gioi_tinh === "Nam"){
            i = 0 ;
        } ;
        switch (Math.floor(person.tuoi/5)) {
            case 0:
                percent_age['0_4'][i]++;
                break;
            case 1:
                percent_age['5_9'][i]++;
                break;
            case 2:
                percent_age['10_14'][i]++;
                break;
            case 3:
                percent_age['15_19'][i]++;
                break;
            case 4:
                percent_age['20_24'][i]++;
                break;
            case 5:
                percent_age['25_29'][i]++;
                break;
            case 6:
                percent_age['30_34'][i]++;
                break;
            case 7:
                percent_age['35_39'][i]++;
                break;
            case 8:
                percent_age['40_44'][i]++;
                break;
            case 9:
                percent_age['45_49'][i]++;
                break;
            case 10:
                percent_age['50_54'][i]++;
                break;
            case 11:
                percent_age['55_59'][i]++;
                break;
            case 12:
                percent_age['60_64'][i]++;
                break;
            case 13:
                percent_age['65_69'][i]++;
                break;
            case 14:
                percent_age['70_74'][i]++;
                break;
            case 15:
                percent_age['75_79'][i]++;
                break;
            case 16:
                percent_age['80_84'][i]++;
                break;
            // sau khi duyệt hết ở trên mà ko có kết quả chứng tỏ tuổi lớn hơn 85
            default:
                percent_age['>=_85'][i]++;
                break;
        }
    });
    // chuyển đối tượng Json về đúng định dạng để có thể vẽ biểu đồ được
    var labels = [] ;
    var series_woman = [] ;
    var series_man = [] ;
    for(age in percent_age){
        labels.push(age);
        series_woman.push(percent_age[age][1]);
        series_man.push(percent_age[age][0]);
    }

    return {labels : labels ,series_woman : series_woman ,series_man : series_man} ;
}
// hàm tính tỷ lệ người trong độ tuổi lao động
exports.percent_working_gender = function(percent_age){
    series_woman = percent_age.series_woman ;
    var count_woman = 0 ;
    series_woman.forEach(x =>{
        count_woman+=x ;
    })

    series_man = percent_age.series_man ;
    var count_man = 0 ;
    series_man.forEach(x =>{
        count_man+=x ;
    })
    
    var count = count_man + count_woman ;

    var count_no_working = series_woman[0] + series_woman[1] + series_woman[2] + series_man[0] + series_man[1] + series_man[2] ;
    count_no_working += series_woman[12]+series_woman[13]+series_woman[14]+series_woman[15]+series_woman[16]+series_woman[17] ;
    count_no_working += series_man[12]+series_man[13]+series_man[14]+series_man[15]+series_man[16]+series_man[17] ;
    var percent_working = Math.round(((count-count_no_working)/count)*10000)/100 ;
    var percent_man = Math.round((count_man/count)*10000)/100 ;
    var percen_woman = 100 - percent_man ;
    return [percent_working , percent_man ,percen_woman] ;
}

///// thống kê theo nghề nghiệp
var percent_jobs = {
    "Nông dân" : 0,
    "Giáo viên" : 0,
    "Bác sĩ" : 0 ,
    "Học sinh" : 0 ,
    "Công nhân" : 0 ,
    "Nhân viên" : 0 ,
    "Công chức" : 0 ,
    "Lao động tự do" : 0 ,
    "Thấp nghiệp" : 0 ,
    "Về hưu" : 0
}

exports.extract_percent_jobs = function(list_person){
    var total = list_person.length ;
    list_person.forEach(person => {
        switch (person.nghe_nghiep) {
            case "Nông dân":
                percent_jobs["Nông dân"] ++ ;
                break;
            case "Giáo viên" :
                percent_jobs["Giáo viên"] ++ ;
                break ;
            case "Bác sĩ" :
                percent_jobs["Bác sĩ"] ++ ;
                break ;
            case "Học sinh - Sinh viên" :
                percent_jobs["Học sinh"] ++ ;
                break ;
            case "Công nhân" :
                percent_jobs["Công nhân"] ++ ;
                break ;
            case "Nhân viên" :
                percent_jobs["Nhân viên"] ++ ;
                break ;
            case "Công chức"  :
                percent_jobs["Công chức"] ++ ;
                break ;
            case "Lao động tự do" :
                percent_jobs["Lao động tự do"] ++ ;
                break ;
            case "Thấp nghiệp" :
                percent_jobs["Thấp nghiệp"] ++ ;
                break ;
            case "Về hưu" :
                percent_jobs["Về hưu"] ++ ;
                break ;
            default:
                break;
        }
    });

    for(job in percent_jobs ){
        percent_jobs[job] = Math.round((percent_jobs[job]/total)*10000)/100 ;
    }
    // chuyển đối tượng Json về đúng định dạng để có thể vẽ biểu đồ được
    var labels = [] ;
    var series = [] ;
    for(job in percent_jobs){
        labels.push(job);
        series.push(percent_jobs[job]);
    }

    return {labels : labels ,series : series} ;
}

//// thống kê theo tôn giáo
var religious = {
    "Không" : 0 ,
    "Phật giáo" : 0 ,
    "Thiên chúa giáo" : 0 ,
    "Hồi giáo" : 0
};

exports.extract_percent_religious = function(list_person){
    var total = list_person.length ;
    list_person.forEach(person => {
        switch (person.ton_giao) {
            case "Không" :
                religious["Không"] ++ ;
                break;
            case "Phật giáo" :
                religious["Phật giáo"] ++ ;
                break;
            case "Thiên chúa giáo" :
                religious["Thiên chúa giáo"] ++ ;
                break;
            case "Hồi giáo" :
                religious["Hồi giáo"] ++ ;
                break;
            default:
                break;
        }
    })

    for( x in religious){
        religious[x] = Math.round((religious[x]/total)*10000)/100 ;
    }
    // chuyển đối tượng Json về đúng định dạng để có thể vẽ biểu đồ được
    var labels = [] ;
    var series = [] ;
    for(x in religious){
        labels.push(x) ;
        series.push(religious[x]) ;
    }
    return {labels : labels , series : series};
}