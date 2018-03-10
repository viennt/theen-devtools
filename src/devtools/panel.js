import Vue from 'vue'

import App from './App'
import router from './router'

// import BootstrapVue from 'bootstrap-vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'

Vue.use(VueMaterial)

Vue.config.productionTip = false

/* eslint-disable no-new */
var root = new Vue({
  el: '#root',
  router,
  components: { App },
  template: `
    <App/>
  `
})

// Create a port with background page for continous message communication
var port = chrome.extension.connect({
  name: 'Angular Devtools Communication' // Given a Name
})

// Listen to messages from the background (background.js)
port.onMessage.addListener((content) => {
  root.$refs.app.addLog(content.websocket.log)
  // port.postMessage(message);
})
