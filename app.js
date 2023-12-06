var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const cors = require('cors');

// 引用路由模块

var indexRouter = require('./routes/index');
var changeRouter = require('./routes/login/change');
var regRouter = require('./routes/login/reg');
var loginRoter = require('./routes/login/login');
var reworkRoter = require("./routes/login/rework")
var findallRoter = require('./routes/commodity/findall');
var findoneRoter = require('./routes/commodity/findon');
var findvalueRoter = require('./routes/commodity/findvalue');
var addressallRoter = require('./routes/address/addressall');
var addressaddRoter = require('./routes/address/addressadd');
var addressfindRoter = require('./routes/address/addressfind');
var addressrewordRoter = require("./routes/address/addressreword");
var lookRoter = require("./routes/login/look");


var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 中间件 app.use(路径, 路由)
app.use('/', indexRouter);
// 修改密码 username password
app.use('/change', changeRouter);
//注册 username password
app.use('/reg', regRouter);
//登录 username password
app.use('/login', loginRoter);
// 修改个人资料 token, name, introduce, tel
app.use("/rework", reworkRoter);
// 查看个人资料 appkey, token
app.use("/look", lookRoter)
// 查询全部商品 appkey
app.use('/findall', findallRoter);
//通过sid查找特定的商品 appkey sbhyz
app.use('/findone', findoneRoter);
// 通过value查找特定商品组 appkey value
app.use('/findvalue', findvalueRoter);
// 查找全部地址 appkey token
app.use('/addressall', addressallRoter);
// 添加地址 token, name, tel, province, city, county, minute, df
app.use('/addressadd', addressaddRoter);
// 查询地址 appkey, token, sid
app.use('/addressfind', addressfindRoter);
// 修改地址 token, name, tel, province, city, county, minute, df, sid
app.use('/addressreword', addressrewordRoter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
