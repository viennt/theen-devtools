// initial state
const state = {
  all: [],
  selected: undefined
}

// getters
const getters = {
  allLogs: state => state.all,
  selectedLog: state => state.selected
}

// actions
const actions = {
  addLog ({ commit }, log) {
    commit('pushLog', log)
  },
  selectLog ({ commit }, log) {
    commit('selectLog', log)
  },
  clearLogs ({ commit }) {
    commit('clearLogs')
  }
}

// mutations
const mutations = {
  pushLog (state, payload) {
    state.all.push(payload)
    chrome.cookies.getAll(function (cookies) {
      console.log(cookies)
    })
  },
  selectLog (state, payload) {
    state.selected = payload
  },
  clearLogs (state) {
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
