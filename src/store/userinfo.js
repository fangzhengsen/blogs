const userinfo = {
    state: {
        username: 'test',
        userpwd: 'testtest',
    },
    mutations: {
        'SET_USER_NAME': function (state, newName) {
            state.username = newName
        },
        'SET_USER_PWD': function (state, newPwd) {
            state.userpwd = newPwd
        }
    },
}

export default userinfo;