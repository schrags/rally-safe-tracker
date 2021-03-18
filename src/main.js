import 'core-js/stable'
import Vue from 'vue'
import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store'
import leaflet from 'leaflet'
import rotatedMarker from 'leaflet-rotatedmarker'
import VueGtag from "vue-gtag";

Vue.config.performance = true
Vue.use(CoreuiVue)
Vue.use(VueGtag, {
  config: { id: "G-SD30FRCH2W" }
});
Vue.prototype.$log = console.log.bind(console)

new Vue({
  el: '#app',
  router,
  store,
  icons,
  template: '<App/>',
  components: {
    App
  }
})
