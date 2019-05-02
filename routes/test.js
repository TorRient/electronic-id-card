var express = require('express');
var router = express.Router();
var statistics = require('../controller/statistics');
var chart = require('../controller/chart');
var make_data = require('../config/make_data');

router.use('/find',statistics.find_person_by_id);
router.use('/count',chart.percent_religious);
router.use('/make_data',make_data.run) ;
router.use('/runStatistic',chart.run_statistic);
router.use('/load',chart.load_result) ;

module.exports = router ;