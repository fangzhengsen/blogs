import Vue from 'vue'
import Vuex from 'vuex'
import userinfo from './userinfo'
import getters from './getters'
import actions from './actions'


Vue.use(Vuex)
const store = new Vuex.Store({
    modules: {
        userinfo,
    },
    getters,
    actions

})

export default store