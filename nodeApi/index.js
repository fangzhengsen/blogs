var config = require('./config')

let app = config.app;
let connection = config.connection

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

app.get('/sideMenu', function (req, res) {
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

    // let sideMenus = {
    //     data: [
    //         {
    //             "id": "101",
    //             "authName": "内容管理",
    //             "path": "content_edit",
    //             "icon": "el-icon-edit",
    //             "children": []
    //         },
    //         {
    //             "id": "109",
    //             "authName": "文档管理",
    //             "path": "content",
    //             "icon": "el-icon-folder-add",
    //             "children": []
    //         },
    //         {
    //             "id": "111",
    //             "authName": "栏目管理",
    //             "path": "category",
    //             "icon": "el-icon-film",
    //             "children": []
    //         },
    //         {
    //             "id": "110",
    //             "authName": "模版管理",
    //             "path": "template",
    //             "icon": "el-icon-monitor",
    //             "children": []
    //         },
    //         {
    //             "id": "102",
    //             "authName": "权限管理",
    //             "path": null,
    //             "icon": "el-icon-key",
    //             "children": [
    //                 {
    //                     "id": "103",
    //                     "authName": "角色管理",
    //                     "path": "role",
    //                     "icon": "el-icon-s-custom",
    //                     "children": []
    //                 },
    //                 {
    //                     "id": "104",
    //                     "authName": "人员管理",
    //                     "path": "manager",
    //                     "icon": "el-icon-user-solid",
    //                     "children": []
    //                 },
    //                 {
    //                     "id": "105",
    //                     "authName": "菜单管理",
    //                     "path": "model",
    //                     "icon": "el-icon-set-up",
    //                     "children": []
    //                 }
    //             ]
    //         },
    //         {
    //             "id": "106",
    //             "authName": "站点管理",
    //             "path": null,
    //             "icon": "el-icon-menu",
    //             "children": [
    //                 {
    //                     "id": "107",
    //                     "authName": "站点管理",
    //                     "path": "app",
    //                     "icon": "el-icon-menu",
    //                     "children": []
    //                 },
    //                 {
    //                     "id": "108",
    //                     "authName": "操作日志",
    //                     "path": "systemLog",
    //                     "icon": "el-icon-menu",
    //                     "children": []
    //                 }
    //             ]
    //         }
    //     ],
    //     meta: {
    //         "msg": "获得菜单列表成功",
    //         "status": 200
    //     }
    // }

    // res.end(JSON.stringify(sideMenus))

})
