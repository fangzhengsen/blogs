var express = require('express')
var mysql = require('mysql');
var bodyParser = require('body-parser')

//创建应用服务
var app = express();

//配置连接数据库参数
var connection = mysql.createConnection({
    host: '47.115.5.124',
    user: 'root',
    password: 'frank123456.',
    database: 'blogs'
});

//连接数据库
connection.connect();

// 处理ajax和form表单post请求参数
app.use(bodyParser.json())// parse application/json
app.use(bodyParser.urlencoded({ extended: true }))// parse application/x-www-form-urlencoded

//允许跨域请求设置
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");
    // res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    // res.header("X-Powered-By", ' 3.2.1')
    // res.header("Content-Type", "application/json;charset=utf-8");
    next();
})

//配置静态文件路径
app.use('/public', express.static('./nodeApi/public/'))

app.listen('8083', function () {
    console.log("服务启动成功，监听8083端口")
})

exports.app = app
exports.connection = connection