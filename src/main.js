import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import store from "./store";
import routes from "./router";
import './utils/index'
import http from './utils/http'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/main.scss'


Vue.config.productionTip = false

Vue.use(VueRouter)

// 路由配置
const RouterConfig = {
  mode: 'history',
  routes: routes
}

const router = new VueRouter(RouterConfig)

router.beforeEach((to, from, next) => {
  if (to.path != "/login" && !window.sessionStorage.getItem('token')) {
    next({
      path: '/login',
    })
  } else {
    next()
  }
})

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})

Vue.prototype.$http = http;


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
