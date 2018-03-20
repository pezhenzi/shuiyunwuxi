let mongoose = require('mongoose');

let LuckyUserSchema = mongoose.Schema({
    openid:String,
    nickName:String,
    sex:Number,
    luckyTimes:Number,
    prize:String,
    luckyDate:String,
    phone:String,
});

let LuckyUser = mongoose.model('LuckyUser', LuckyUserSchema);
module.exports = LuckyUser;