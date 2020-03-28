
const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/login',
        component: (resolve) => require(['../views/login.vue'], resolve)
    },
    {
        path: '/home',
        component: (resolve) => require(['../views/home.vue'], resolve),
        redirect: '/userList',
        children: [
            {
                path: '/userList',
                component: (resolve) => require(['../views/components/userList.vue'], resolve),
            },
            {
                path: '/content_edit',
                component: (resolve) => require(['../views/components/content_edit.vue'], resolve),
            },
            {
                path: '/content',
                component: (resolve) => require(['../views/components/content.vue'], resolve),
            },
            {
                path: '/category',
                component: (resolve) => require(['../views/components/category.vue'], resolve),
            },
            {
                path: '/template',
                component: (resolve) => require(['../views/components/template.vue'], resolve),
            },
            {
                path: '/role',
                component: (resolve) => require(['../views/components/authority/role.vue'], resolve),
            },
            {
                path: '/manager',
                component: (resolve) => require(['../views/components/authority/manager.vue'], resolve),
            },
            {
                path: '/model',
                component: (resolve) => require(['../views/components/authority/model.vue'], resolve),
            },
            {
                path: '/app',
                component: (resolve) => require(['../views/components/app/app.vue'], resolve),
            },
            {
                path: '/systemLog',
                component: (resolve) => require(['../views/components/app/systemLog.vue'], resolve),
            }
        ]
    },

]

export default routes;