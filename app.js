var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
//用来记录请求的
var logger = require('morgan');
var settings = require('./settings');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var cookieParser = require('cookie-parser');
//解析cookie
var bodyParser = require('body-parser');
//挂载对象在请求体上
require('./db');

var routes = require('./routes/index');
var user = require('./routes/user');
var article=require('./routes/article');
var flash = require('connect-flash');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));//设置模板的路径
app.set('view engine', 'html');//设置模板引擎
app.engine('html',require('ejs').__express)

// uncomment after placing your favicon in /public
//把favicon图标放在public目录下取消掉注释
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());//req.cookies
app.use(session({
  secret: settings.cookieSecret,//secret 用来防止篡改 cookie
  //设定 cookie 的生存期，这里我们设置 cookie 的生存期为 30 天
  //cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},
  resave:true,//每次都重新保存session
  saveUninitialized:true,//保存没有初始化的session
  //设置它的 store 参数为 MongoStore 实例，把会话信息存储到数据库中，
  //以避免重启服务器时会话丢失
  store: new MongoStore({
   url:settings.url,
  })
}));
app.use(flash());//顺序有关系，要依赖session，所以要放在session中间件后边
app.use(function(req,res,next){
  // res.locals是真正用来渲染模板的对象
  res.locals.user = req.session.user;
  res.locals.success = req.flash('success').toString();
  res.locals.error = req.flash('error').toString();
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);//以哪个路径开头
app.use('/user', user);
app.use('/article', article);

// catch 404 and forward to error handler 捕获404并且交由中间件处理
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers 错误处理

// development error handler 开发环境错误处理
// will print stacktrace 将打印堆栈信息
//env 读取的环境变量中的 NODE_ENV
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler 生产环境错误处理
// no stacktraces leaked to user//不要向用户暴露堆栈信息
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
