import Vue from 'vue'

import app from './app'
import router from './router'
import store from './store'

/****************************************
 * Import third-party
 ****************************************/
import Element from 'element-ui'
import VueCodemirror from 'vue-codemirror'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/neo.css'
import VueClipboard from 'vue-clipboard2'

import VueRx from 'vue-rx'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import { Subscription } from 'rxjs/Subscription'

import { mapActions } from 'vuex'

/****************************************
 * Declare third-party
 ****************************************/
Vue.use(Element)
Vue.use(VueCodemirror, {
  options: {
    tabSize: 4,
    styleActiveLine: true,
    lineNumbers: true,
    line: true,
    mode: 'text/javascript',
    theme: 'neo'
  }
})
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

/****************************************
 * Communicate with background
 ****************************************/

// Create a port with background page for
// continous message communication
var port = chrome.extension.connect({
  name: 'Angular Devtools Communication' // Given a Name
})

// Listen to messages from the background
port.onMessage.addListener((content) => {
  root.addLog(content.log)
  // port.postMessage(message);
})
