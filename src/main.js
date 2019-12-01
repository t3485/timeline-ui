import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'


Vue.config.productionTip = false
Vue.use(element)

axios.interceptors.response.use(function (config) {
    return config;
  }, function (error) {
    if (error.response.status == 401){
      store.commit('clearAuthToken')
    }
    return Promise.reject(error);
  });
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://localhost:21021/api';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
