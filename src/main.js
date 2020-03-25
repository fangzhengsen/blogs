import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import store from "./store";
import routes from "./router";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/main.scss'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(ElementUI);

// 路由配置
const RouterConfig = {
  mode: 'history',
  routes: routes
}

const router = new VueRouter(RouterConfig)

// router.beforeEach((to,from,next)=>{
//   window.document.title=to.meta.title
//   next();
// })

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})



new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
