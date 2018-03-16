import Vue from 'vue'

import app from './app'
import router from './router'
import store from './store'

import { mapActions } from 'vuex'

import VueMaterial from 'vue-material'
import VueClipboard from 'vue-clipboard2'

import VueRx from 'vue-rx'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import { Subscription } from 'rxjs/Subscription'

Vue.use(VueMaterial)
Vue.use(VueClipboard)
Vue.use(VueRx, {
  Observable,
  Subject,
  Subscription
})

Vue.config.productionTip = false

/* eslint-disable no-new */
var root = new Vue({
  el: '#root',
  router,
  store,
  components: { app },
  template: `
    <app />
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
