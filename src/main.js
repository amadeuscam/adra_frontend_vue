import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue';
import  axios from 'axios';
import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false
Vue.use(Antd);
axios.defaults.baseURL = 'http://localhost:8000/api/';


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
