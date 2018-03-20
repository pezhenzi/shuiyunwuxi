let express = require('express');
let app = express();
let router = express.Router();
let mbkf = require('../config/mbkf');
let LuckyUser = require('../models/LuckyUser');
let Prize = require('../models/Prize');
let TodayPrize = require('../models/TodayPrize');
let jsSHA = require('jssha');
let WechatAPI = require('wechat-api');
let api = new WechatAPI(mbkf.appid, mbkf.AppSecret);
let wechat = require('wechat');
let OAuth = require('wechat-oauth');
let client = new OAuth(mbkf.appid, mbkf.AppSecret);
let questions = require('../module/shuiliPhotos');
let moment = require('moment');

let sywx = {
    token: 'shuiyunwuxi2018',
    appid: 'wxbc5d76172fd60c14',
    AppSecret: '7013c5a1fd20f000d86965ef2e940a2c',
    encodingAESKey: 'thwYadqwn3nlyQcVWGLpuZVcvWtBs95LU0ZY2UDzHjt',
    checkSignature: true
};

app.use(express.query());

function randomQuestion(arr, pick) {
    const len = arr.length;
    let picked = [];
    for (let i = 0; i < pick; i++) {
        let num = Math.floor(Math.random() * arr.length);
        picked.push(arr[num]);
        arr.splice(num, 1);
    }
    return picked;
}

router.get('/shuiyunwuxi', function (req, res, next) {
    res.send('#');
});

// 注意，接入时必须用get方式！
router.get('/', wechat(sywx, function (req, res, next) {
    var message = req.weixin;
    switch (message.MsgType) {
        case 'text':
            if (message.Content === '恭喜') {
                res.reply({
                    type: 'text',
                    content: '发财！'
                });
            } else if (message.Content === '图文') {
                res.reply([{
                    title: 'How To Access Camera Parameters',
                    description: 'This article describes the various camera parameters exposed by Vuforia and how to use them.',
                    picurl: 'http://7xj165.com1.z0.glb.clouddn.com/QQ%E6%88%AA%E5%9B%BE20170526142643.png',
                    url: 'http://mp.weixin.qq.com/s/Jtpcf2ViQSpu0xGZNg8psg'
                }]);
            }
            break;
        case 'image':
            if (message.PicUrl) {
                res.reply({
                    type: 'text',
                    content: message.PicUrl
                });
            }
            break;
        case 'voice':
            if (message.MediaId) {
                res.reply({
                    type: 'text',
                    content: message.MediaId
                });
            }
            break;
        case 'video':
            if (message.MediaId) {
                res.reply({
                    type: 'text',
                    content: message.FromUserName
                });
            }
            break;
        case 'location':
            if (message.MsgId) {
                res.reply({
                    type: 'text',
                    content: '你的位置：北纬' + message.Location_X + '，东经' + message.Location_Y
                });
            }
            break;
        case 'event':
            if (message.Event === 'subscribe') {
                res.reply({
                    type: 'text',
                    content: '欢迎关注水韵无锡公众号！'
                });
            } else if (message.Event === 'CLICK' && message.EventKey === 'home') {
                res.reply({
                    type: 'text',
                    content: 'You clicked the home menu.'
                });
            } else if (message.Event === 'CLICK' && message.EventKey === 'zan') {
                res.reply({
                    type: 'text',
                    content: 'You clicked the zan button.'
                });
            } else if (message.Event === 'SCAN') {
                if (message.EventKey === 'libai') {
                    res.reply({
                        type: 'text',
                        content: '朝辞白帝彩云间 千里江陵一日还'
                    });
                }
            }
            break;

        default:
            res.reply({
                type: 'text',
                content: 'Hello'
            });
    }


}));

router.get('/MP_verify_MOl5VPo6EFS0A76n.txt', function (req, res, next) {
    res.sendFile('MP_verify_MOl5VPo6EFS0A76n.txt', {
        root: __dirname
    });
});

router.get('/menu', function (req, res, next) {
    api.getMenu(function (err, result) {
        if (err) {
            console.log(err.stack);
            res.send(err.stack);
        } else {
            console.log(result);
            res.send(result);
        }
    });
});

router.get('/set-menu', function (req, res, next) {
    var menu = {
        "button": [
            {
                "type": "view",
                "name": "水利资讯",
                "url": "http://mp.weixin.qq.com/mp/homepage?__biz=MzI3Mjk3MjIzMA==&hid=2&sn=6114ff3fd8d6a58095e8771721b3299c&scene=18"
            },
            {
                "type": "view",
                "name": "生态河湖",
                "url": "http://mp.weixin.qq.com/mp/homepage?__biz=MzI3Mjk3MjIzMA==&hid=3&sn=e6d4c52bc2602f0e4546e3cbd6d413a4&scene=18"
            },
            {
                "name": "微互动",
                "sub_button": [
                    {
                        "type": "view",
                        "name": "有奖互动",
                        "url": "http://wpc.jnwb.net/wechat/from"
                    },
                    {
                        "type": "view",
                        "name": "水利网站",
                        "url": "http://www.wxwater.gov.cn/"
                    },
                    {
                        "type": "view",
                        "name": "咨询投诉",
                        "url": "http://216449.weixin.drip.im/form/detail/40d41b45-9648-4956-b1d8-044ded048818?special=216449"
                    },
                    {
                        "type": "view",
                        "name": "号内搜",
                        "url": "https://data.newrank.cn/m/s.html?s=OysvPjI7KytG"
                    },
                ]
            }
        ]
    };
    api.createMenu(menu, function (err, result) {
        if (err) {
            console.log(err.stack);
        } else {
            console.log(result);
            res.send(result);
        }
    });
});

router.get('/get-followers', function (req, res) {
    var openids = null;
    api.getFollowers(function (err, result) {
        if (err) {
            console.log(err.stack);
        } else {
            openids = result.data.openid;
            api.updateRemark(openids[0], 'Boss', function (err, result) { //改的是备注名
                if (err) {
                    console.log(err.stack);
                }
            });
            api.batchGetUsers(openids.slice(0, 99), function (err, rsl) { //每次最多100个
                if (err) {
                    console.log(err.stack);
                } else {
                    res.send(rsl);
                }
            });
        }
    });
});

//要呈现一个需要授权的业务页面，需要两个路由
//1 授权页，只redirect至由api组装好的url；
//2 业务界面
router.get('/from', function (req, res) {
    const START_DAY = 79, END_DAY = 360 ,START_HOUR = 10, END_HOUR = 22;
    const day = moment().dayOfYear();
    const hour = moment().hour();
    const year = moment().year();
    const now = moment();
    //时间控制
    if(day < START_DAY){
        res.render('keepOutAnswer',{msg:'活动尚未开始'});
    } else if(day > END_DAY){
        res.render('keepOutAnswer',{msg:'活动已结束'});
    } else{
        if(hour < START_HOUR){
            res.render('keepOutAnswer',{msg:'今天的活动尚未开始，请' + START_HOUR + '点以后再来。'});
        } else if(hour >= END_HOUR){
            res.render('keepOutAnswer',{msg:`今天的活动已于${END_HOUR}点整结束了。`});
        } else{
            var redirect = 'http://wpc.jnwb.net/wechat/target'; //最终的业务页面
            var state = 'jnwb';
            var scope = 'snsapi_base';
            var url = client.getAuthorizeURL(redirect, state, scope); //组建授权页面
            res.redirect(url); //如果是静默授权，直接跳转至target，否则弹出授权确认页。
        }
    }
});
router.get('/target', function (req, res) {
    const day = moment().dayOfYear();
    let code = req.query.code;
    let state = req.query.state;
    const keys = Object.keys(questions);
    let picked = randomQuestion(keys, 5);
    let pickedQuestions = [];
    picked.forEach((item) => {
        pickedQuestions.push(questions[item])
    }); 

    //查询今日50元话费中奖名单 查询操作是异步的，应该避免回调，使用promise！
    let todayLuckyUsers = [];
    const promise = new Promise(function(resolve, reject){
        LuckyUser.find(
            {luckyTimes:1, luckyDate:day, prize:25},
            function(err, result){
                if(err) console.log(err);
                if(result.length > 0){
                    resolve(result);
                } else{
                    reject(err);
                }
            });
    });
    promise.then(function(value){
        value.forEach(function(item){
            let phoneArr = item.phone.split('');
            phoneArr.splice(3, 4, '*', '*', '*', '*');
            let phone = phoneArr.join('');
            todayLuckyUsers.push({
                nickname:item.nickName, 
                phone:phone,
            });
        });
        console.log('promise worked.')
    }, function(error){
        console.log('lucky users less than one.')
        console.log(error)
    });
    
    client.getAccessToken(code, function (err, result) {
        const openid = result.data.openid;
        if (err) {
            console.log(err.stack);
        } else {
            api.getUser(openid, function (err, rsl) {
                if (err) {
                    console.log(err);
                } else {
                    subs = rsl.subscribe;
                    if (subs === 0) {
                        res.render('subscribe');
                    } else {
                        LuckyUser.findOne({
                            openid: openid
                        }, function (err, data) {
                            if (err) console.log(err);
                            if (data && data.luckyTimes === 0) {
                                //console.log(pickedQuestions);
                                res.render('userAnswer', {
                                    openid: openid,
                                    nickName: rsl.nickname,
                                    questions: pickedQuestions,
                                    todayLucky:todayLuckyUsers,
                                });
                            } else if (data && data.luckyTimes === 1) {
                                res.render('userRead');
                            } else {
                                LuckyUser.create({
                                    openid: openid,
                                    nickName: rsl.nickname,
                                    sex: rsl.sex,
                                    luckyTimes: 0,
                                    prize: '',
                                    luckyDate: '',
                                }, function (err) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        res.render('userAnswer', {
                                            openid: openid,
                                            nickName: rsl.nickname,
                                            questions: pickedQuestions,
                                            todayLucky:todayLuckyUsers,
                                        });
                                    }
                                })
                            }
                        });
                    }


                }
            });
        }
    });
});

//该路由废弃
router.get('/lucky-entry', function (req, res) {
    var redirect = 'http://wpc.jnwb.net/wechat/lucky';
    var state = req.query.openid;
    var scope = 'snsapi_base';
    var url = client.getAuthorizeURL(redirect, state, scope);
    res.redirect(url);
})

function luckyHandler(remainder) {
    console.log(`line 280: ${remainder}`);
    const h = remainder.todayA,
        f = remainder.todayB,
        t = remainder.todayC;
    if (remainder.todayTotal <= 0) {
        return -1
    }
    const number = Math.floor(Math.random() * 100);
    console.log('随机数：' + number);
    switch (true) {
        case number >= 0 && number <= 10: //有10%的概率抽中奖品A
            if (h > 0 && h <= 10) {
                return 25;
            } else if (h <= 0 && t > 0) {
                return 50;
            } else if (h <= 0 && t <= 0 && f > 0) {
                return 100;
            }
            break;
        case number > 10 && number <= 40: //有30%的概率抽中奖品B
            if (f > 0 && f <= 300) {
                return 100;
            } else if (f <= 0 && t > 0) {
                return 50;
            } else if (f <= 0 && t <= 0 && h > 0) {
                return 25;
            }
            break;
        case number > 40 && number <= 100: //有60%的概率抽中奖品C
            if (t > 0 && t <= 2000) {
                return 50;
            } else if (t <= 0 && f > 0) {
                return 100;
            } else if (t <= 0 && f <= 0 && h > 0) {
                return 25;
            }
    }
}

router.post('/lucky', function (req, res) {
    const day = moment().dayOfYear();
    const hour = moment().hour();
    const year = moment().year();
    const now = moment();
    let todayTotal = todayA = todayB = todayC = 0;

    //检查剩余奖品总数；检查今日数据是否已创建，已创建则读取数据，否则创建数据。
    Prize.findOne({
        title: 'shuiyunwuxilucky',
        status: 'live',
    }, function (err, data) {
        if (err) console.log(err);
        console.log(`line 333: ${data}`);
        if (data.totalPrizes <= 0) {
            console.log('line 334: 奖品全部发完了！')
            res.json({
                allow: false,
                msg: '奖品全部发完了。'
            });
        } else {
            TodayPrize.findOne({
                title: 'shuiyunwuxilucky',
                todayDay: day,
            }, function (err, today) {
                if (err) console.log(err);
                if (today) {
                    //如果今日数据已存在，执行抽奖代码，直接向luckyHandler传入today。
                    console.log('line 347: 今日数据已存在，直接使用。')
                    if(today.todayTotal > 0){
                        LuckyUser.findOne({
                            openid: req.body.openid
                        }, function (err, data) {
                            if (err) console.log(err);
                            if (data.luckyTimes === 0) {
                                //抽奖
                                const number = luckyHandler(today);
                                console.log('line 355: 奖品代码为' + number)
                                //更新奖品总数
                                const queryPrize = {
                                    title: 'shuiyunwuxilucky',
                                    status: 'live',
                                };
                                switch (number) {
                                    case 25:
                                        Prize.update(queryPrize, {
                                            $inc: {
                                                totalPrizes: -1,
                                                prizeA: -1
                                            }
                                        }, {}, (err, docs) => {
                                            console.log(docs)
                                        });
                                        break;
                                    case 50:
                                        Prize.update(queryPrize, {
                                            $inc: {
                                                totalPrizes: -1,
                                                prizeC: -1
                                            }
                                        }, {}, (err, docs) => {
                                            console.log(docs)
                                        });
                                        break;
                                    case 100:
                                        Prize.update(queryPrize, {
                                            $inc: {
                                                totalPrizes: -1,
                                                prizeB: -1
                                            }
                                        }, {}, (err, docs) => {
                                            console.log(docs)
                                        });
                                        break;
                                    default:
                                        return;
                                }
                    
                                //更新今日奖品数量
                                const queryToday = {
                                    title: 'shuiyunwuxilucky',
                                    todayDay:day,
                                };
                                switch (number) {
                                    case 25:
                                        TodayPrize.update(queryToday, {
                                            $inc: {
                                                todayTotal: -1,
                                                todayA: -1
                                            }
                                        }, {}, (err, docs) => {
                                            console.log(docs)
                                        });
                                        break;
                                    case 50:
                                        TodayPrize.update(queryToday, {
                                            $inc: {
                                                todayTotal: -1,
                                                todayC: -1
                                            }
                                        }, {}, (err, docs) => {
                                            console.log(docs)
                                        });
                                        break;
                                    case 100:
                                        TodayPrize.update(queryToday, {
                                            $inc: {
                                                todayTotal: -1,
                                                todayB: -1
                                            }
                                        }, {}, (err, docs) => {
                                            console.log(docs)
                                        });
                                        break;
                                    default:
                                        return;
                                }
                                //更新用户数据
                                LuckyUser.update( //参数不写完整居然不能更新数据！包括可选的回调函数。
                                    {
                                        openid: req.body.openid
                                    }, {
                                        luckyTimes: 1,
                                        prize: number,
                                        luckyDate: day
                                    }, {},
                                    function (err, docs) {
                                        if (err) console.log(err);
                                        console.log('line 446: 更改成功：' + docs);
                                    }
                                );
                    
                                res.json({
                                    number: number,
                                    allow: true
                                });
                            } else {
                                res.json({
                                    allow: false,
                                    mag: '你已经中过一次奖了，不能重复抽奖。'
                                });
                            }
                        });
                    } else{
                        res.json({
                            allow: false,
                            msg: '今天的奖品发完了,请明天再来。'
                        });
                    }
                } else {
                    const {
                        prizeA,
                        prizeB,
                        prizeC
                    } = data;
                    todayA = prizeA >= 10 ? 10 : prizeA; //今日A奖品数量
                    todayB = prizeB >= 300 ? 300 : prizeB; //今日B奖品数量
                    todayC = prizeC >= 2000 ? 2000 : prizeC; //今日C奖品数量
                    todayTotal = todayA + todayB + todayC; //今日奖品总数
                    const todayData = {
                        todayTotal,
                        todayA,
                        todayB,
                        todayC,
                    };
                    
                    TodayPrize.create({
                        title: 'shuiyunwuxilucky',
                        todayDay: day,
                        todayTotal: todayTotal,
                        todayA: todayA,
                        todayB: todayB,
                        todayC: todayC,
                    }, function (err, docs) {
                        if (err) console.log(err);
                        console.log(`line 383: ${docs}`);
                    });
                    //在此抽奖，向抽奖函数传入todayData
                    LuckyUser.findOne({
                        openid: req.body.openid
                    }, function (err, data) {
                        if (err) console.log(err);
                        if (data.luckyTimes === 0) {
                            //抽奖
                            const number = luckyHandler(todayData);
                            console.log('line 510: 奖品代码为 ' + number)
                            //更新奖品总数
                            const queryPrize = {
                                title: 'shuiyunwuxilucky',
                                status: 'live',
                            };
                            switch (number) {
                                case 25:
                                    Prize.update(queryPrize, {
                                        $inc: {
                                            totalPrizes: -1,
                                            prizeA: -1
                                        }
                                    }, {}, (err, docs) => {
                                        console.log(docs)
                                    });
                                    break;
                                case 50:
                                    Prize.update(queryPrize, {
                                        $inc: {
                                            totalPrizes: -1,
                                            prizeC: -1
                                        }
                                    }, {}, (err, docs) => {
                                        console.log(docs)
                                    });
                                    break;
                                case 100:
                                    Prize.update(queryPrize, {
                                        $inc: {
                                            totalPrizes: -1,
                                            prizeB: -1
                                        }
                                    }, {}, (err, docs) => {
                                        console.log(docs)
                                    });
                                    break;
                                default:
                                    return;
                            }
                
                            //更新今日奖品数量
                            const queryToday = {
                                title: 'shuiyunwuxilucky'
                            };
                            switch (number) {
                                case 25:
                                    TodayPrize.update(queryToday, {
                                        $inc: {
                                            todayTotal: -1,
                                            todayA: -1
                                        }
                                    }, {}, (err, docs) => {
                                        console.log(docs)
                                    });
                                    break;
                                case 50:
                                    TodayPrize.update(queryToday, {
                                        $inc: {
                                            todayTotal: -1,
                                            todayC: -1
                                        }
                                    }, {}, (err, docs) => {
                                        console.log(docs)
                                    });
                                    break;
                                case 100:
                                    TodayPrize.update(queryToday, {
                                        $inc: {
                                            todayTotal: -1,
                                            todayB: -1
                                        }
                                    }, {}, (err, docs) => {
                                        console.log(docs)
                                    });
                                    break;
                                default:
                                    return;
                            }
                            //更新用户数据
                            //const queryUser = {openid:req.body.openid};
                            LuckyUser.update( //参数不写完整居然不能更新数据！包括可选的回调函数。
                                {
                                    openid: req.body.openid
                                }, {
                                    luckyTimes: 1,
                                    prize: number,
                                    luckyDate: day
                                }, {},
                                function (err, docs) {
                                    if (err) console.log(err);
                                    console.log('更改成功：' + docs);
                                }
                            );
                
                            res.json({
                                number: number,
                                allow: true
                            });
                        } else {
                            res.json({
                                allow: false,
                                mag: '你已经中过一次奖了，不能重复抽奖。'
                            });
                        }
                    });
                }
            });
        }
    });
});
router.post('/check-answer', function (req, res) {
    console.log(req.body.answer);
    let {
        openid,
        answer,
        index
    } = req.body;
    console.log(index);
    let rightAnswer = Object.values(questions)
        .find((item) => item.questionIndex == index)
        .answer;
    console.log(rightAnswer);
    if (answer === rightAnswer) {
        res.json({
            result: true
        });
    } else {
        res.json({
            result: false
        });
    }
});
router.get('/read-entry', function (req, res) {
    var redirect = 'http://wpc.jnwb.net/wechat/read';
    var state = 'jnwb';
    var scope = 'snsapi_base';
    var url = client.getAuthorizeURL(redirect, state, scope);
    res.redirect(url);
});
router.get('/read', function (req, res) {
    res.render('userRead');
});
router.get('/restart', function(req, res){
    res.render('userRestart');
});
router.get('/set-prize', function (req, res) {
    Prize.create({
        title: 'shuiyunwuxilucky',
        startDay: 79, //dayOfYear
        endDay: 365,
        totalPrizes: 6930,
        prizeA: 30,
        prizeB: 900,
        prizeC: 6000,
        status: 'live',
    });
    TodayPrize.create({});
    res.send('OK');
});
router.post('/sent-phone', function (req, res) {
    console.log(req.body);
    let openid = req.body.openid;
    let phone = req.body.phone;
    LuckyUser.update({
        'openid': openid
    }, {
        'phone': phone
    }, {}, function (err, docs) {
        if (err) return err;
    });
    res.json({
        status: true
    });
});
router.get('/lucky-users', function (req, res) {
    LuckyUser.find({
        luckyTimes: 1
    }, function (err, docs) {
        if (docs) {
            res.render('luckyUsers', {
                data: docs
            });
        } else {
            res.send('还没有人中奖');
        }
    });
});
router.get('/moment', function (req, res) {
    res.send(moment());
})
router.get('/server', function (req, res) {
    /*api.sendText('o_M4CuEl6-OHIUEEuxdq2xOtZIf8', '客服消息', function(err,result){
        if(err){
            console.log(err);
        } else{
            console.log(result);
        }
    });*/
    //api.createGroup('暗影刺客', function(){});
    //api.moveUserToGroup('o_M4CuEl6-OHIUEEuxdq2xOtZIf8',100);
    api.getWhichGroup('o_M4CuEl6-OHIUEEuxdq2xOtZIf8');
    api.getGroups(function (err, result) {
        res.send(result);
    });
});

router.get('/tpl-msg', function (req, res) {
    var templateId = 'wQiKBEDDvhK5p5a5uEH7PnyDgvrFnlQRCCrdl7_lRKM',
        oid = 'o_M4CuEl6-OHIUEEuxdq2xOtZIf8',
        url = 'http://wpc.jnwb.net',
        data = {
            "first": {
                "value": "非常感谢您的报名！",
                "color": "#173177"
            },
            "keyword1": {
                "value": "李白",
                "color": "#173177"
            },
            "keyword2": {
                "value": "三年二班",
                "color": "#173177"
            },
            "keyword3": {
                "value": "2017年5月22日 18:33",
                "color": "#173177"
            },
            "keyword4": {
                "value": "已支付",
                "color": "#173177"
            },
            "remark": {
                "value": "请按时报到！",
                "color": "#173177"
            }
        };
    api.sendTemplate(oid, templateId, url, data, function () {});
    res.send('模板消息已发送');
});

router.get('/qr', function (req, res) {
    api.createLimitQRCode('libai', function (err, result) {
        var ticket = result.ticket;
        var qrUrl = api.showQRCodeURL(ticket);
        res.render('showQR', {
            url: qrUrl
        });
    });
});

module.exports = router;