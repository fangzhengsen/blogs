var config = require('./config')
require('./tpl_compile')

let app = config.app;
let connection = config.connection

//登录接口
app.post('/user', function (req, res) {
    let sql = `SELECT * from user WHERE user_name='${req.body.name}' AND user_pwd='${req.body.pwd}'`
    connection.query(sql, function (error, results) {
        if (error) throw error;
        if (results.length) {
            let token = Math.floor(new Date().getTime() + Math.random() * 100000)
            res.send({ msg: '登陆成功', data: true, code: 200, token: token })
        } else {
            res.send({ msg: '用户名或密码错误', data: false, code: 203 })
        }

    });
})

//菜单接口
app.get('/sideMenu', function (req, res) {
    console.log("持续连接中")
    let data = []
    let children = {}
    let sql = `SELECT * FROM model`
    connection.query(sql, function (error, results) {
        if (error) throw error;
        if (results.length) {
            results.forEach(item => {
                item.model_id = item.model_id.toString()
                if (item.model_parent_ids) {
                    if (children[item.model_parent_ids] === undefined)
                        children[item.model_parent_ids] = []
                    children[item.model_parent_ids].push(item)
                } else {
                    item.children = []
                    data.push(item)
                }
            });
            for (const parent_id in children) {
                data.forEach(item => {
                    if (item.model_id == parent_id) {
                        item.children = children[parent_id]
                    }
                });
            }
        }
        let sideMenu = {
            data: data,
            meta: {
                "msg": "获得菜单列表成功",
                "status": 200
            }
        }
        res.send(sideMenu)
    })

})
