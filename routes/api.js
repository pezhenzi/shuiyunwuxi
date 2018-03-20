let express = require('express');
let router = express.Router();
let formidable = require('formidable');
let multiparty = require('multiparty');
let serviceItem = require('../models/ServiceItem');

router.get('/get-services', function(req, res, next){
    serviceItem.find({}, function(err, data){
        if(err) console.log(err);
        res.json({
            services:data,
            timeStamp:new Date().valueOf(),
        });
    })
});

router.post('/service/save-order', function(req, res, next){
    let form = new formidable.IncomingForm();
    form.uploadDir = 'public/upload';
    form.keepExtensions = true;
    form.maxFieldsSize = 2 * 1024 * 1024;
    form.multiples = true;
    form.parse(req, function(err,fields,files){
        if(err) console.log(err);
        console.log(fields);
        console.log(files);
        res.json({msg:'Success'});
    });
});

module.exports = router;
