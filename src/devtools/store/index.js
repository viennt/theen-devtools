import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import logs from './modules/logs'
import servers from './modules/servers'
import requests from './modules/requests'
import websocket from './modules/websocket'
import settings from './modules/settings'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
const persistedoptions = {
  paths: ['logs', 'servers', 'requests', 'settings']
}

export default new Vuex.Store({
  modules: {
    logs,
    servers,
    requests,
    websocket,
    settings
  },
  strict: debug,
  plugins: [createPersistedState(persistedoptions)]
})
