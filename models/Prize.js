let mongoose = require('mongoose');

let PrizeSchema = mongoose.Schema({
    title: String,
    startDay: Number,
    endDay: Number,
    totalPrizes: Number,
    prizeA: Number,
    prizeB: Number,
    prizeC: Number,
    prizeD: Number,
    prizeE: Number,
    prizeF: Number,
    status: String,
});

let Prize = mongoose.model('Prize', PrizeSchema);
module.exports = Prize;