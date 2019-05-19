var express = require('express');
var router = express.Router();
var chart = require('../controller/chart');
var make_data = require('../config/make_data');

// router.use('/count',chart.percent_religious);
// router.use('/make_data',make_data.run) ;
// router.use('/runStatistic',chart.run_statistic);
 router.use('/load',chart.load_population_of_province) ;
// router.use('/province',make_data.get_list_province) ;
// router.post('/ajax',chart.load_ajax) ;

module.exports = router ;