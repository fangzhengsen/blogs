
const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/login',
        component: (resolve) => require(['../views/login.vue'], resolve)
    },

]

export default routes;