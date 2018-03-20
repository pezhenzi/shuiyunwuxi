let express = require('express');
let router = express.Router();
let formidable = require('formidable');
let serviceItem = require('../models/ServiceItem');

router.get('/manage', function(req, res, next){
    serviceItem.find({},function(err, data){
        if(err) console.log(err);
        console.log(data);
        res.render('service/servicesManage', {
            msg:`Manage services items list`,
            data:data,
        });
    });
});

router.get('/add-item', function(req, res, next) {
    res.render('inputService',{title:`请在此处录入服务项目`});
});

//注意路由参数的使用方法 req.params.id
router.get('/edit-item/:id', function(req, res, next){
    let id = req.params.id;
    serviceItem.find({_id:id}, function(err, data){
        console.log(data);
        res.render('service/editItem',{dataObject:data[0], id:id});
    });
});
router.get('/delete-item/:id', function(req, res, next){
    let id = req.params.id;
    serviceItem.remove({_id:id}, function(err){
        if(err) console.log(err);
    });
    res.redirect('/admin/service/manage');
});

router.post('/save-service', function(req, res ,next){
    let form = new formidable.IncomingForm();
    form.uploadDir = 'public/upload';
    form.keepExtensions = true;
    form.maxFieldsSize = 2 * 1024 * 1024;
    form.multiples = true;
    form.parse(req, function(err,fields,files){
        if(err) console.log(err);
        let inputArray = Object.keys(fields), priceArray = [], dividePrice = [];
        for(let i=0; i<inputArray.length; i++){
            if(inputArray[i].includes('price')){
                priceArray.push(inputArray[i]);
            }
        }
        let priceNames = [], priceNumber = [];
        for(let i=0; i<priceArray.length; i++){
            if(priceArray[i].includes('pricen')){
                priceNames.push(priceArray[i]);
            } else if(priceArray[i].includes('pricep')){
                priceNumber.push(priceArray[i]);
            }
        }
        if(priceNames.length === priceNumber.length){
            for(let i=0; i<priceNames.length; i++){
                if(priceNames[i].charAt(priceNames[i].length - 1) === priceNumber[i].charAt(priceNumber[i].length - 1)){
                    let name = fields[priceNames[i]], price = fields[priceNumber[i]];
                    dividePrice.push({'item':name, 'price':price,});
                }
            }
        }

        let serviceTime = {
            day:fields.serverTime,
            start:fields.startTime,
            end:fields.overTime,
        };
        console.log(serviceTime);

        serviceItem.create({
                name:fields.name,
                phone:fields.phone,
                intro:fields.intro,
                content:fields.content,
                server:fields.merchant,
                technician:fields.servers.split('，'),
                picture:[files.itemPic.path],
                price:dividePrice,
                total:fields.total,
                serveTime:serviceTime,
            }, function(err){
                if(err){
                    console.log(err);
                } else{
                    console.log(files.itemPic.path);  //获取上传后的文件路径
                    console.log(fields);
                    res.redirect('/admin/service/add-item');
                }
            }
        );
    });

});

router.get('/order-manage', function(req, res,next){
    res.render('service/orderManage', {title:`用户预约管理界面`});
});

router.get('/feedback-manage', function(req, res,next){
    res.render('service/feedbackManage', {title:`用户反馈信息的管理界面`});
});

module.exports = router;