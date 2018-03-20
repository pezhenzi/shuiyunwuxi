let express = require('express');
let router = express.Router();

router.get('/', function(req,res){
    //res.send(`workbench here.`);
    res.render('workbench/index', {msg:`这里是公共看板`});
});

module.exports = router;