let mongoose = require('mongoose');

let TodaySchema = mongoose.Schema({
    title: String,
    todayDay:Number,
    todayTotal: Number,
    todayA: Number,
    todayB: Number,
    todayC: Number,
    todayD: Number,
    todayE: Number,
    todayF: Number,
    todayLuckyUsers: Number,
});

let TodayPrize = mongoose.model('TodayPrize', TodaySchema);
module.exports = TodayPrize;