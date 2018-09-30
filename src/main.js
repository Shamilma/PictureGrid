import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueLazyload from 'vue-lazyload'

// config AJAX library
axios.defaults.baseURL = "https://api.example.com"

// Get rid of annoying production tip
Vue.config.productionTip = false

// Use vue lazyload
Vue.use(VueLazyload)

new Vue({
  el: '#app',
  render: h => h(App)
})
