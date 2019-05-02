var identificationcards = require('../models/identification_card');

var percent_age = {
    '0_4' : 0 ,
    '5_9' : 0 ,
    '10_14' : 0 ,
    '15_19' : 0 ,
    '20_24' : 0 ,
    '25_29' : 0 ,
    '30_34' : 0 ,
    '35_39' : 0 ,
    '40_44' : 0 ,
    '45_49' : 0 ,
    '50_54' : 0 ,
    '55_59' : 0 ,
    '60_64' : 0 ,
    '65_69' : 0 ,
    '70_74' : 0 ,
    '75_79' : 0 ,
    '80_84' : 0,
    '>=_85' : 0

} ;
// hàm này trả về một đối tượng json chứa tỷ lệ dân số theo độ tuổi
exports.extract_percent_age = async function(list_person){
    list_person.forEach(person => {
        switch (Math.floor(person.tuoi/5)) {
            case 0:
                percent_age['0_4']++;
                break;
            case 1:
                percent_age['5_9']++;
                break;
            case 2:
                percent_age['10_14']++;
                break;
            case 3:
                percent_age['15_19']++;
                break;
            case 4:
                percent_age['20_24']++;
                break;
            case 5:
                percent_age['25_29']++;
                break;
            case 6:
                percent_age['30_34']++;
                break;
            case 7:
                percent_age['35_39']++;
                break;
            case 8:
                percent_age['40_44']++;
                break;
            case 9:
                percent_age['45_49']++;
                break;
            case 10:
                percent_age['50_54']++;
                break;
            case 11:
                percent_age['55_59']++;
                break;
            case 12:
                percent_age['60_64']++;
                break;
            case 13:
                percent_age['65_69']++;
                break;
            case 14:
                percent_age['70_74']++;
                break;
            case 15:
                percent_age['75_79']++;
                break;
            case 16:
                percent_age['80_84']++;
                break;
            // sau khi duyệt hết ở trên mà ko có kết quả chứng tỏ tuổi lớn hơn 85
            default:
                percent_age['>=_85']++;
                break;
        }
    });
    // chuyển đối tượng Json về đúng định dạng để có thể vẽ biểu đồ được
    var labels = [] ;
    var series = [] ;
    for(age in percent_age){
        labels.push(age);
        series.push(percent_age[age]);
    }

    return {labels : labels ,series : series} ;
}
// hàm tính tỷ lệ người trong độ tuổi lao động
exports.percent_working_age = async function(percent_age){
    series = percent_age.series ;
    var count = 0 ;
    series.forEach(x =>{
        count+=x ;
    })
    var count_no_working = series[0] + series[1] + series[2] ;
    count_no_working = count_no_working + series[12]+series[13]+series[14]+series[15]+series[16]+series[17]
    var percent = Math.round(((count-count_no_working)/count)*10000)/100 ;
    return percent ;
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