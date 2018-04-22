import '@/assets/js/firebase.js'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueFire from 'vuefire'
import '@/assets/css/bootstrap.min.css'
import '@/assets/js/bootstrap.min.js'

Vue.use(VueFire)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
