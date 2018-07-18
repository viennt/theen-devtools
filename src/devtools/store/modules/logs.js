// initial state
const state = {
  all: [],
  selected: undefined
}

// getters
const getters = {
  allLogs: state => state.all.filter(data => !!data),
  selectedLog: state => state.selected
}

// actions
const actions = {
  addLog ({ commit }, log) {
    commit('PUSH_LOG', log)
  },
  selectLog ({ commit }, log) {
    commit('SELECT_LOG', log)
  },
  removeLog ({ commit }, log) {
    commit('REMOVE_LOG', log)
  },
  clearLogs ({ commit }) {
    commit('CLEAR_LOGS')
  }
}

// mutations
const mutations = {
  PUSH_LOG (state, payload) {
    state.all.push(payload)
    // TODO: Get MAX_LOG_ITEMS from settings
    let MAX_LOG_ITEMS = 20
    if (state.all.length > MAX_LOG_ITEMS) {
      state.all.shift()
    }
  },
  SELECT_LOG (state, payload) {
    state.selected = payload
  },
  REMOVE_LOG (state, payload) {
    let index = state.all.indexOf(payload)
    if (index > -1) state.all.splice(index, 1)
  },
  CLEAR_LOGS (state) {
    state.all = []
    state.selected = undefined
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
