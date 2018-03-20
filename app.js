let express = require('express'),
    path = require('path'),
    pug = require('pug');
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');
mongoose.connect('mongodb://pezhenzi:jnwb!2018fm@localhost:27017/wechat');
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'error:'));
db.once('open', function(){
    console.log('OK');
});

let index = require('./routes/index'),
    workbench = require('./routes/workbench/index'),
    users = require('./routes/users'),
    wechat = require('./routes/wechat'),
    wxdzf = require('./routes/wxdzf'),
    service = require('./routes/service'),
    activity = require('./routes/activity'),
    system = require('./routes/system'),
    custom = require('./routes/custom'),
    user = require('./routes/user'),
    mall = require('./routes/mall'),
    test = require('./routes/test');
    api = require('./routes/api');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', require('cors')());   //允许跨域访问api，且限制在'/api'路径下。

app.use('/', index);
app.use('/workbench', workbench);
app.use('/users', users);
app.use('/wechat', wechat);
app.use('/wxdzf', wxdzf);
app.use('/api', api);
app.use('/admin/service', service);
app.use('/admin/activity', activity);
app.use('/admin/user', user);
app.use('/admin/custom', custom);
app.use('/admin/system', system);
app.use('/admin/mall', mall);
app.use('/test', test);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
