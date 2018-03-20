let express = require('express');
let router = express.Router();
//let activityItem = require('../models/ActivityItem');

router.get('/', function(req,res,next){
    res.render('userManager', {title:`这里是用户管理中心`});
});

router.get('/group', function(req,res,next){
    res.render('user/group', {title:`用户分组管理`});
});

router.get('/list', function(req,res,next){
    res.render('user/list', {title:`用户列表展示/管理，分页。`});
});

module.exports = router;