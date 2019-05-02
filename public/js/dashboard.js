
  function run_statistic(){
    document.getElementById("warning").style.display = 'block' ;
    document.getElementById("box_warning").style.display = 'block' ;
  }
  function ok(){
    window.location="/runStatistic";
  }
  function cance(){
    document.getElementById("warning").style.display = 'none' ;
    document.getElementById("box_warning").style.display = 'none' ;
  }

  function max(array){
    var max = 0 ;
    array.forEach(element => {
      if (max < element) {
        max = element ;
      } ;
    });
    return Math.ceil(max) ;
  }

  function draw_chart(){
  // vẽ biểu đồ độ tuổi
  var percent_age = JSON.parse($("#percent_age").text());
  // hiển thị tỷ lệ độ tuổi lao động
  var y = document.getElementById("percent_working_age");
  y.innerHTML = "Tỷ lệ người trong độ tuổi lao động là : " + String(percent_age.percent_working) + " %";
  new Chartist.Bar('#table_age', { 
      labels : percent_age.labels.reverse() ,
      series : [percent_age.series.reverse()]
    }, {
      
      seriesBarDistance: 10,
      reverseData: true,
      horizontalBars: true,
      axisY: {
        offset: 70
      }
    });
    // vẽ biểu đồ nghề nghiệp
      var percent_jobs = JSON.parse($("#percent_jobs").text());
      // hiển thị tỷ lệ thất nghiệp
      var x = document.getElementById("percent_out_of_work").innerHTML = "Tỷ lệ thất nghiệp là : " + String(percent_jobs.series[8])+"%" ;
      new Chartist.Bar('#table_jobs', {
        labels: percent_jobs.labels,
        series: [percent_jobs.series]
        }, {
         
          axisY: {
            labelInterpolationFnc: function(value) {
              return value + "%";
            }
          }
         }).on('draw', function(data) {
          if(data.type === 'bar') {
            data.element.attr({
              style: 'stroke-width: 30px'
            });
          }
      });
        
      
      
    // vẽ biểu đồ tôn giáo
    var percent_religious = JSON.parse($("#percent_religious").text());
    new Chartist.Bar('#table_religious',{ 
      labels : percent_religious.labels ,
      series : [percent_religious.series]
    } , {
    
    axisY: {
      labelInterpolationFnc: function(value) {
        return value + "%";
      }
    }
   }).on('draw', function(data) {
    if(data.type === 'bar') {
      data.element.attr({
        style: 'stroke-width: 30px'
      });
    }
    });
  }