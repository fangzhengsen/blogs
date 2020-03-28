var http = require('http')
var mysql = require('mysql');


var connection = mysql.createConnection({
    host: '47.115.5.124',
    user: 'root',
    password: 'frank123456.',
    database: 'blogs'
});

connection.connect();

//1.创建 Server
let server = http.createServer();
//2.监听require请求事件，设置请求处理函数
server.on('request', function (req, res) {
    if (!req.url.startsWith('/api')) res.end();
    let url = req.url.slice(4)
    res.setHeader('Content-Type', 'text/plain;charset=utf-8')
    res.setHeader("Access-Control-Allow-Origin", "*");

    let sql = `SELECT * from user WHERE user_name='test' AND user_pwd='tet'`
    connection.query(sql, function (error, results) {
        if (error) throw error;
        if (results.length) {
            res.end(JSON.stringify({ msg: '请求成功', data: true, code: 200 }))
        } else {
            res.end(JSON.stringify({ msg: '用户名或密码错误', data: false, code: 203 }))
        }

    });


})
//3.绑定端口号，启动服务
server.listen(8083, function () {
    console.log("服务启动成功")
})