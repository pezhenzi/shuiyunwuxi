let mongoose = require('mongoose');

let LuckyHistorychema = mongoose.Schema({
    openid:{
        type:String,
        index:true,
        unique:true,
    },
    nickname:String,
    prize:String,
    luckyTime:String,
    answerTimes:Number,
    cashing:Boolean,
});

let LuckyHistory = mongoose.model('LuckyHistory', LuckyHistorychema);
module.exports = LuckyHistory;