import Vue from 'vue'
import Vuex from 'vuex'

import logs from './modules/logs'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    logs
  },
  strict: debug
})
