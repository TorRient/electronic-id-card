var danso = null;
$.getJSON('../population_of_province.json', function(data) {
    danso = data;
});
google.load('visualization', '1', {
    'packages': ['geochart', 'table'],
    'mapsApiKey' : 'AIzaSyCg8xkevToFVt5jDEdYjtOAX5lwZvHu1UE'
});
google.setOnLoadCallback(drawRegionsMap);
function drawRegionsMap() {
    var data = google.visualization.arrayToDataTable([
        ['State', 'Dân số'],
        ['Bắc Giang', danso["Bắc Giang"]],
        ['Bắc Kạn', danso["Bắc Kạn"]],
        ['Cao Bằng', danso["Cao Bằng"]],
        ['Hà Giang', danso["Hà Giang"]],
        ['Lạng Sơn', danso["Lạng Sơn"]],
        ['Phú Thọ', danso["Phú Thọ"]],
        ['Quảng Ninh', danso["Quảng Ninh"]],
        ['Thái Nguyên', danso["Thái Nguyên"]],
        ['Tuyên Quang', danso["Tuyên Quang"]],
        ['Lào Cai', danso["Lào Cai"]],
        ['Yên Bái', danso["Yên Bái"]],
        ['Điện Biên', danso["Điện Biên"]],
        ['Hòa Bình', danso["Hòa Bình"]],
        ['Lai Châu', danso["Lai Châu"]],
        ['Sơn La', danso["Sơn La"]],
        ['Bắc Ninh', danso["Bắc Ninh"]],
        ['Hà Nam', danso["Hà Nam"]],
        ['Hải Dương', danso["Hải Dương"]],
        ['Hưng Yên', danso["Hưng Yên"]],
        ['Nam Định', danso["Nam Định"]],
        ['Ninh Bình', danso["Ninh Bình"]],
        ['Thái Bình', danso["Thái Bình"]],
        ['Vĩnh Phúc', danso["Vĩnh Phúc"]],
        ['VN-HN', danso["Hà Nội"]],
        ['Hải Phòng City', danso["Hải Phòng"]],
        ['Hà Tĩnh', danso["Hà Tĩnh"]],
        ['Nghệ An', danso["Nghệ An"]],
        ['Quảng Bình', danso["Quảng Bình"]],
        ['Quảng Trị', danso["Quảng Trị"]],
        ['Thanh Hóa', danso["Thanh Hóa"]],
        ['Thừa Thiên–Huế', danso["Thừa Thiên Huế"]],
        ['Đắk Lắk', danso["Đắk Lắk"]],
        ['VN-72', danso["Đắk Nông"]],
        ['Gia Lai', danso["Gia Lai"]],
        ['Kon Tum', danso["Kon Tum"]],
        ['Lâm Đồng', danso["Lâm Đồng"]],
        ['Bình Định', danso["Bình Định"]],
        ['Bình Thuận', danso["Bình Thuận"]],
        ['Khánh Hòa', danso["Khánh Hòa"]],
        ['Ninh Thuận', danso["Ninh Thuận"]],
        ['Phú Yên', danso["Phú Yên"]],
        ['Quảng Nam', danso["Quảng Nam"]],
        ['Quảng Ngãi', danso["Quảng Ngãi"]],
        ['Đà Nẵng City', danso["Đà Nẵng"]],
        ['Bà Rịa–Vũng Tàu', danso["Bà Rịa Vũng Tàu"]],
        ['Bình Dương', danso["Bình Dương"]],
        ['Bình Phước', danso["Bình Phước"]],
        ['Đồng Nai', danso["Đồng Nai"]],
        ['Tây Ninh', danso["Tây Ninh"]],
        ['VN-SG', danso["TP HCM"]],
        ['An Giang', danso["An Giang"]],
        ['VN-55', danso["Bạc Liêu"]],
        ['Bến Tre', danso["Bến Tre"]],
        ['Cà Mau', danso["Cà Mau"]],
        ['Đồng Tháp', danso["Đồng Tháp"]],
        ['Hậu Giang', danso["Hậu Giang"]],
        ['Kiên Giang', danso["Kiên Giang"]],
        ['Long An', danso["Long An"]],
        ['Sóc Trăng', danso["Sóc Trăng"]],
        ['Tiền Giang', danso["Tiền Giang"]],
        ['Trà Vinh', danso["Trà Vinh"]],
        ['Vĩnh Long', danso["Vĩnh Long"]],
        ['VN-CT', danso["Cần Thơ"]],
        ['VN-DN', danso["Đà Nẵng"]]]);

    var opts = {
        region: 'VN',
        displayMode: 'regions',
        resolution: 'provinces',
        width: 800,
        height: 600,
        colorAxis: {
            colors: ['yellow', 'red']
        }
    };
    var geochart = new google.visualization.GeoChart(
        document.getElementById('visualization'));
    geochart.draw(data, opts);
};