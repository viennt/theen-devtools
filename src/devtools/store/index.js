import Vue from 'vue'
import Vuex from 'vuex'

import logs from './modules/logs'
import servers from './modules/servers'
import websocket from './modules/websocket'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    logs,
    servers,
    websocket
  },
  strict: debug
})
