import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'


Vue.config.productionTip = false
Vue.use(element)

Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://localhost:21021/api';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
