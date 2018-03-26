import Vue from 'vue'
import Vuex from 'vuex'

import logs from './modules/logs'
import websocket from './modules/websocket'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    logs,
    websocket
  },
  strict: debug
})
