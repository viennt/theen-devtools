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
  clearLogs ({ commit }) {
    commit('CLEAR_LOGS')
  }
}

// mutations
const mutations = {
  PUSH_LOG (state, payload) {
    state.all.push(payload)
  },
  SELECT_LOG (state, payload) {
    state.selected = payload
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
