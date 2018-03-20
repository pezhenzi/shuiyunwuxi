let express = require('express');
let router = express.Router();
//let activityItem = require('../models/ActivityItem');

router.get('/main', function(req,res,next){
    res.render('systemManager', {title:`这里是系统管理中心`});
});

module.exports = router;