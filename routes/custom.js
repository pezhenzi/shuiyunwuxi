let express = require('express');
let router = express.Router();
//let activityItem = require('../models/ActivityItem');

router.get('/', function(req,res,next){
    res.render('customManager', {title:`这里是客服管理中心`});
});

router.get('/online', function(req,res,next){
    res.render('custom/online', {title:`在线客服，使用微信的客服系统收发信息。`});
});

router.get('/message', function(req,res,next){
    res.render('custom/message', {title:`用户的离线留言管理`});
});

module.exports = router;