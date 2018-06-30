import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(VueResource)

Vue.config.productionTip = false
Vue.http.options.root = 'http://46.229.212.225/api'
Vue.http.options.emulateJSON = true
Vue.http.headers.common['application/json']


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
