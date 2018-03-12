import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'

import { mapActions } from 'vuex'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'

import VueClipboard from 'vue-clipboard2'

import JsonTree from 'vue-json-tree'

Vue.use(VueMaterial)
Vue.use(VueClipboard)
Vue.component('json-tree', JsonTree)

Vue.config.productionTip = false

/* eslint-disable no-new */
var root = new Vue({
  el: '#root',
  router,
  store,
  components: { App },
  template: `
    <App/>
  `,
  methods: mapActions([
    'addLog'
  ])
})

// Create a port with background page for continous message communication
var port = chrome.extension.connect({
  name: 'Angular Devtools Communication' // Given a Name
})

// Listen to messages from the background (background.js)
port.onMessage.addListener((content) => {
  root.addLog(content.websocket.log)
  // port.postMessage(message);
})
