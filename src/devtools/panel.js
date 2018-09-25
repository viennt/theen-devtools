import devtools from '@vue/devtools'
import Vue from 'vue'

import app from './app'
import router from './router'
import store from './store'

/****************************************
 * Import third-party
 ****************************************/
import Element from 'element-ui'
import VueClipboard from 'vue-clipboard2'
import VueChatScroll from 'vue-chat-scroll'
import VueMoment from 'vue-moment'

import VueCodemirror from 'vue-codemirror'
import 'codemirror/mode/javascript/javascript.js'

import VueRx from 'vue-rx'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import { Subscription } from 'rxjs/Subscription'

import { mapActions } from 'vuex'

/****************************************
 * Import third-party style
 ****************************************/
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/eclipse.css'
import './scss/main.scss'

/****************************************
 * Declare third-party
 ****************************************/
Vue.use(Element)
Vue.use(VueClipboard)
Vue.use(VueChatScroll)
Vue.use(VueMoment)
Vue.use(VueCodemirror, {
  options: {
    tabSize: 4,
    indentWithTabs: true,
    styleActiveLine: true,
    lineNumbers: true,
    line: true,
    mode: 'text/javascript',
    theme: 'eclipse'
  }
})
Vue.use(VueRx, {
  Observable,
  Subject,
  Subscription
})

Vue.filter('highlight', function (words, query) {
  return words.replace(query, '<span class=\'highlight\'>' + query + '</span>')
})

Vue.config.productionTip = false

if (process.env.NODE_ENV === 'development') {
  devtools.connect(/* host, */ 8089)
}

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
  let log = content.log
  root.addLog({
    ...log,
    id: log.id + Math.random()
  })
  // port.postMessage(message);
})
