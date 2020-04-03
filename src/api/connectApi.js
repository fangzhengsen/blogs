const CONNECTAPI = {
    getUser: {
        method: 'post',
        url: '/user'
    },
    getMenuList: {
        method: 'get',
        url: '/sideMenu'
    },
    getTemplateList: {
        method: 'post',
        url: '/templateList'
    },
}
export default CONNECTAPI;