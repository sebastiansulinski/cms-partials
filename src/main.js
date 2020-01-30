import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import EventBus from '@ssdcode/vue-event-bus'
window.EventBus = window.EventBus || new EventBus()

new Vue({
  render: h => h(App)
}).$mount('#app')
