import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from './utils/request' //路由响应拦截
import {gets,posts} from "./utils/api"

// element ui 引入
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import {Message} from "element-ui";
Vue.use(ElementUI)

// 配置axios
import axios from "axios";
Vue.prototype.$axios = axios;


Vue.prototype.$http = http
Vue.prototype.$gets = gets
Vue.prototype.$posts = posts
Vue.prototype.$message = Message


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
