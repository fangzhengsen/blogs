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
    editTempate: {
        method: 'post',
        url: '/editTempate'
    },
    saveTemplate: {
        method: 'post',
        url: '/writeTemplate'
    },
    delTemplate: {
        method: 'post',
        url: '/delTemplate'
    }
}
export default CONNECTAPI;