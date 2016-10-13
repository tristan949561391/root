var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var log = require('log4js').getLogger('log_boot')

var routes = require('./routes/index');
var users = require('./routes/users');
var conf = require('./conf')

//初始化日志配置
require('./init/log')

var app = express();


// 设置视图引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());




//静态资源
app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

//路由管理
app.use('/', routes);
app.use('/users', users);

// 404错误页面
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// 异常处理器
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error/error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
