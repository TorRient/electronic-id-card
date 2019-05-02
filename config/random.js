var lastname = ["Nguyễn","Trần","Lê","Phạm","Hoàng","Phan","Vũ","Đặng","Bùi","Đỗ","Hồ","Ngô","Dương","Lý"] ;
var boymiddlename = ["Văn","Bá","Mạnh","Thanh","Thành","Đức","Ngọc","Toàn","Doãn","Anh","Hùng"] ;
var girlmiddlename = ["Thị","Diệu","Xuân","Thu","Cẩm","Kỳ","Châu","Hồng","Hạnh","Quỳnh"] ;
var girlname = ["Mai","Lan","Cúc","Hoa","Hương","Hồng","Huệ","Yến","Oanh","Đào","Nhung","Lụa","Vân","Thúy","Diễm","Lệ","Nguyệt","Nga","Trang","Huyền","Ngân","Thu"] ;
var boyname = ["Cương","Cường","Hùng","Tráng","Dũng","Thông","Minh","Trí","Tuệ","Quang","Sáng","Nhân","Trung","Tín","Nghĩa","Công","Hiệp","Phúc","Phú","Quý","Kim","Tài","Danh","Đạt","Sơn","Giang","Lâm","Hải","Dương","Long","Quốc"];


exports.get_girlname = function(){
    var x = lastname.length ;
    var y = girlmiddlename.length ;
    var z = girlname.length ;
    return lastname[randoms(x)] + " " + girlmiddlename[randoms(y)] + " " + girlname[randoms(z)];

}

exports.get_boyname = function(){
    var x = lastname.length ;
    var y = boymiddlename.length ;
    var z = boyname.length ;
    return lastname[randoms(x)] + " " + boymiddlename[randoms(y)] + " " + boyname[randoms(z)];
}

exports.get_address = function(list_province){
    var x = list_province.length ;
    console.log('số tỉnh thành phố là : '+x);
    return list_province[randoms(x)].ten;
}

exports.get_jobs = function (nghe_nghiep){
    var x = nghe_nghiep.length ;
    return nghe_nghiep[randoms(x)].nn ;
}

exports.get_religious = function(ton_giao){
    var x = randoms(10);
    if (x<4) {
        return ton_giao[x].tg ;
    } else if(x<8) {
        return "Không" ;
    } else {
        return "Phật giáo" ;
    }
}

exports.get_nation = function(dan_toc){
    var x = randoms(915);
    if (x<54) {
        return dan_toc[x].dt ;
    } else {
        return "Kinh" ;
    }
}
exports.get_image = function(i){
    return "./img_identification/"+ String(i) +".jpg" ;
}

exports.get_date = function(){
    // vì date nó liên quan đến phân bố tuổi nên làm phức tạp một chút
    var age ;
    let x = randoms(1000);
    if (x<252) {
        age = randoms(15) ;
    } else if (x<442) {
        age = randoms(10) + 15 ;
    } else if (x<755) {
        age = randoms(20) + 25 ;
    } else if (x<945) {
        age = randoms(20) + 45 ;
    } else {
        age = randoms(35) + 65 ;
    }
    var date = new Date(2019-age,randoms(11)+1,randoms(28)+1) ; // lưu ý ở đây kết quả trả về tháng ở giữa nó cộng thêm 1 , ngày nó trừ đi 1 ????
    return date ;
}

function randoms(range){
    return Math.round(Math.random()*1000)%range ;
}