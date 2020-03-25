import treeMenu from '../views/tree-menu/index.vue'


const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: (resolve) => require(['../views/index.vue'], resolve)
    },
    {
        path: '/treeMenu',
        meta: {
            title: 'treeMenu'
        },
        component: treeMenu
    },

]

export default routes;