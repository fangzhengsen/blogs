var express = require('express')
var mysql = require('mysql');
var path = require('path')
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

//设置模板后缀名
app.engine('html', require('express-art-template'))

//配置模板所在文件夹名
app.set('views', path.join(__dirname, 'templates'))

app.post('/user', function (req, res) {
    let sql = `SELECT * from user WHERE user_name='${req.body.name}' AND user_pwd='${req.body.pwd}'`
    connection.query(sql, function (error, results) {
        if (error) throw error;
        if (results.length) {
            let token = Math.floor(new Date().getTime() + Math.random() * 100000)
            res.end(JSON.stringify({ msg: '请求成功', data: true, code: 200, token: token }))
        } else {
            res.end(JSON.stringify({ msg: '用户名或密码错误', data: false, code: 203 }))
        }

    });
})

app.get('/sideMenu', function (req, res) {
    let sideMenu = {
        data: [
            {
                "id": "101",
                "authName": "内容管理",
                "path": "content_edit",
                "icon": "el-icon-edit",
                "children": []
            },
            {
                "id": "109",
                "authName": "文档管理",
                "path": "content",
                "icon": "el-icon-folder-add",
                "children": []
            },
            {
                "id": "111",
                "authName": "栏目管理",
                "path": "category",
                "icon": "el-icon-film",
                "children": []
            },
            {
                "id": "110",
                "authName": "模版管理",
                "path": "template",
                "icon": "el-icon-monitor",
                "children": []
            },
            {
                "id": "102",
                "authName": "权限管理",
                "path": null,
                "icon": "el-icon-key",
                "children": [
                    {
                        "id": "103",
                        "authName": "角色管理",
                        "path": "role",
                        "icon": "el-icon-s-custom",
                        "children": []
                    },
                    {
                        "id": "104",
                        "authName": "人员管理",
                        "path": "manager",
                        "icon": "el-icon-user-solid",
                        "children": []
                    },
                    {
                        "id": "105",
                        "authName": "菜单管理",
                        "path": "model",
                        "icon": "el-icon-set-up",
                        "children": []
                    }
                ]
            },
            {
                "id": "106",
                "authName": "站点管理",
                "path": null,
                "icon": "el-icon-menu",
                "children": [
                    {
                        "id": "107",
                        "authName": "站点管理",
                        "path": "app",
                        "icon": "el-icon-menu",
                        "children": []
                    },
                    {
                        "id": "108",
                        "authName": "操作日志",
                        "path": "systemLog",
                        "icon": "el-icon-menu",
                        "children": []
                    }
                ]
            }
        ],
        meta: {
            "msg": "获得菜单列表成功",
            "status": 200
        }
    }
    console.log("请求api")
    res.end(JSON.stringify(sideMenu))

})


app.listen('8083', function () {
    console.log("服务启动成功，监听8083端口")
})






/* 原生服务写法 */
//1.创建 Server
/*let server = http.createServer();
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
})*/