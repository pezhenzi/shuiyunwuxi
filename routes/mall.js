let express = require('express');
let router = express.Router();
//let activityItem = require('../models/ActivityItem');

router.get('/main', function(req,res,next){
    res.render('mallManager', {title:`这里是商城管理中心`});
});

module.exports = router;