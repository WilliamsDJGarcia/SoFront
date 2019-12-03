import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './route'
// import Notifications from 'vue-notification'
import VueNoty from 'vuejs-noty'

Vue.config.productionTip = false

Vue.use(VueNoty,router)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
