let express = require('express');
let router = express.Router();
let pool = require('../module/pool.js');
let codeList = require('../module/codeList.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('无锡大走访');
});

//显示查询界面
router.get('/data', function(req,res,next){
	res.render('inputCode', {title:`input the code.`});
});

//查询单个代码的数据
router.post('/search', function(req,res,next){
	pool.getConnection(function(err,connection){
		if(err){
			console.log(err);
		}
		let code = req.body.code;

		let queryString = 'SELECT COUNT(*) FROM pigcms_custom_info WHERE set_id=24 AND sub_info LIKE "%'+code+'%"';
		connection.query(queryString, function(err, result, fields) {
        	if (err){
           		console.log(err)
        	}
        	connection.release();

        	let num = result[0]["COUNT(*)"]
        	let date = new Date().toLocaleDateString();
        	let time = new Date().toLocaleTimeString();

        	res.render('result',{count:num,time:time,date:date});
    	});
	})
});

//查询单个代码数据的方法
function getData(cd,bcd){
	return new Promise((resolve,reject) => {
        pool.getConnection(function(err,connection){
            if(err){
                console.log(err);
            }
            let code = parseInt(cd);
            let queryString = 'SELECT COUNT(*) FROM pigcms_custom_info WHERE set_id=24 AND sub_info LIKE "%'+code+'%"';
            connection.query(queryString, function(err, result, fields) {
                if (err){
                    console.log(err);
                }
                connection.release();

                resolve([result[0]["COUNT(*)"],codeList[bcd][cd]]);
            });
        })
    })
}

router.post('/search-big', function(req,res,next){
    let date = new Date().toLocaleDateString();
    let time = new Date().toLocaleTimeString();
	let codeInput =parseInt(req.body.codeBig);
	let bigCodes = codeList.bigCodes;
	if(bigCodes.indexOf(codeInput) !== -1){
        let keys = Object.keys(codeList[codeInput]);
        let num = [];
        let promises = keys.map(function(item){
            return getData(parseInt(item),codeInput);
        });
        Promise.all(promises).then((allData) => {  //把循环中的每次请求作为一个promise，待全部resolve后再继续。
            num = allData;
            let countArray = [];
            for(let i=0; i<allData.length;i++){
                countArray.push(allData[i][0]);
            }
            let total = countArray.reduce(function(pre,cur,index,array){  //用reduce数组求和
                return pre + cur;
            });
            let name = codeList.codeNames[codeInput];
            //res.send(`${name}的总数：${total},
            //具体数据：${num}`);
            res.render('resultList', {
                name:name,
                total:total,
                data:num,
                date:date,
                time:time,
            })
        });
	} else{
		res.send(`Sorry`);
	}


});

module.exports = router;
