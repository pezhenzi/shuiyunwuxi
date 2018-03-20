let express = require('express');
let router = express.Router();
let formidable = require('formidable');
//let activityItem = require('../models/ActivityItem');

router.get('/', function(req,res,next){
    res.render('activityManager', {title:`这里是活动管理中心`});
});

router.get('/add-item', function(req, res, next){
    res.render('activity/addItem',{title:`添加新的活动项目并管理已有活动`})
});

router.post('/save-act', function(req,res){
    /*let form = new formidable.IncomingForm();
    form.uploadDir = 'public/upload';                   //文件保存路径
    form.keepExtensions = true;                         //保留文件后缀
    form.maxFieldsSize = 2 * 1024 * 1024;
    form.multiples = true;                              //多文件上传
    form.parse(req,function(err,fields,files){
        if(err) return console.log(err);
        console.log(fields);
        console.log(files);
        res.redirect('/admin/activity/add-item');
    });*/
    console.log(req.body);
});

router.get('/order-manage', function(req, res, next){
    res.render('activity/orderManage',{title:`管理用户的报名`})
});

module.exports = router;