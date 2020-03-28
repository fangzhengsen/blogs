let user = {
    data: true,
    msg: '登陆成功了'
}

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

export { user, sideMenu };