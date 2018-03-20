let mongoose = require('mongoose');

let comments = mongoose.Schema({
    content:String,
    time:String,
    name:String,
});

let serviceTime = mongoose.Schema({
    day:String,
    start:String,
    end:String,
});

let serviceItemSchema = mongoose.Schema({
    name:String,
    phone:Number,
    intro:String,
    content:String,
    server:String,
    technician:[String],
    serveTime:serviceTime,
    price:[],
    total:Number,
    picture:[String],
    precondition:String,
    grade:Number,
    comments:[comments],
});

//model函数的第一个参数指定了集合名称，在这里就是items，
let ServiceItem = mongoose.model('Item', serviceItemSchema);

module.exports = ServiceItem;