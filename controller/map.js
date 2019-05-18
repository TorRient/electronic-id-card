soDan = require("../controller/chart")

google.load('visualization', '1', {
    'packages': ['geochart', 'table']
});
google.setOnLoadCallback(drawRegionsMap);
function drawRegionsMap() {
    var data = google.visualization.arrayToDataTable([
        ['State', 'Dân số'],
        ['Bắc Giang', 1],
        ['Bắc Kạn', 2],
        ['Cao Bằng', 3],
        ['Hà Giang', 4],
        ['Lạng Sơn', 5],
        ['Phú Thọ', 6],
        ['Quảng Ninh', 7],
        ['Thái Nguyên', 8],
        ['Tuyên Quang', 9],
        ['Lào Cai', 10],
        ['Yên Bái', 11],
        ['Điện Biên', 12],
        ['Hòa Bình', 13],
        ['Lai Châu', 14],
        ['Sơn La', 15],
        ['Bắc Ninh', 16],
        ['Hà Nam', 17],
        ['Hải Dương', 18],
        ['Hưng Yên', 19],
        ['Nam Định', 20],
        ['Ninh Bình', 21],
        ['Thái Bình', 22],
        ['Vĩnh Phúc', 23],
        ['VN-HN', 24],
        ['Hải Phòng City', 25],
        ['Hà Tĩnh', 26],
        ['Nghệ An', 27],
        ['Quảng Bình', 28],
        ['Quảng Trị', 29],
        ['Thanh Hóa', 30],
        ['Thừa Thiên–Huế', 31],
        ['Đắk Lắk', 32],
        ['VN-72', 33],
        ['Gia Lai', 34],
        ['Kon Tum', 35],
        ['Lâm Đồng', 36],
        ['Bình Định', 37],
        ['Bình Thuận', 38],
        ['Khánh Hòa', 39],
        ['Ninh Thuận', 40],
        ['Phú Yên', 41],
        ['Quảng Nam', 42],
        ['Quảng Ngãi', 43],
        ['Đà Nẵng City', 44],
        ['Bà Rịa–Vũng Tàu', 45],
        ['Bình Dương', 46],
        ['Bình Phước', 47],
        ['Đồng Nai', 48],
        ['Tây Ninh', 49],
        ['VN-SG', 50],
        ['An Giang', 51],
        ['VN-55', 52],
        ['Bến Tre', 53],
        ['Cà Mau', 54],
        ['Đồng Tháp', 55],
        ['Hậu Giang', 56],
        ['Kiên Giang', 57],
        ['Long An', 58],
        ['Sóc Trăng', 59],
        ['Tiền Giang', 60],
        ['Trà Vinh', 61],
        ['Vĩnh Long', 62],
        ['VN-CT', 63],
        ['VN-DN', 64]]);

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

  // function myClickHandler() {
  //   var selection = geochart.getSelection();
  //   console.log(selection)
  //   for (var i = 0; i < selection.length; i++) {
  //     var item = selection[i];
  //     if (item.row != null && item.column != null) {
  //       message += '{row:' + item.row + ',column:' + item.column + '}';
  //     } else if (item.row != null) {
  //       message += '{row:' + item.row + '}';
  //     } else if (item.column != null) {
  //       message += '{column:' + item.column + '}';
  //     }
  //   }
  //   if (message == '') {
  //     message = 'nothing';
  //   }
  //   alert('You selected ' + message);
  // }
  // google.visualization.events.addListener(geochart, 'select', myClickHandler);
//   google.visualization.events.addListener(geochart, 'select', function () {
//     var selection = geochart.getSelection();

//     // if same city is clicked twice in a row
//     // it is "unselected", and selection = []
//     if (typeof selection[0] !== "undefined") {
//       var value = data.getValue(selection[0].row, 0);
//       alert('City is: ' + value);
//     }
//   });