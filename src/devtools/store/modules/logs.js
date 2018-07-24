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
  addLog ({ commit, state, rootState }, log) {
    commit('PUSH_LOG', log)
    if (state.all.length > rootState.settings.maxLogsItems) {
      commit('REMOVE_LOG_BY_INDEX', 0)
    }
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
  },
  SELECT_LOG (state, payload) {
    state.selected = payload
  },
  REMOVE_LOG (state, payload) {
    let index = state.all.indexOf(payload)
    if (index > -1) state.all.splice(index, 1)
  },
  REMOVE_LOG_BY_INDEX (state, payload) {
    if (payload > -1) state.all.splice(payload, 1)
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
