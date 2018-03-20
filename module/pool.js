var mysql = require('mysql');
var pool = mysql.createPool({
    host: '61.155.41.221',
    port: 3306,
    database: 'pigcms',
    user: 'dzf',
    password: 'qktssb'
});
module.exports = pool;