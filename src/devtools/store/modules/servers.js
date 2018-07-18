// initial state
const state = {
  all: [
    {name: 'Echo', value: 'wss://echo.websocket.org'}
  ],
  selected: undefined
}

// getters
const getters = {
  allServers: state => state.all.filter(data => !!data),
  selectedServer: state => state.selected
}

// actions
const actions = {
  addServer ({ commit }, server) {
    commit('PUSH_SERVER', server)
  },
  selectServer ({ commit }, server) {
    commit('SELECT_SERVER', server)
  },
  removeServer ({ commit }, server) {
    commit('REMOVE_SERVER', server)
  },
  clearServers ({ commit }) {
    commit('CLEAR_SERVERS')
  }
}

// mutations
const mutations = {
  PUSH_SERVER (state, payload) {
    state.all.push(payload)
  },
  SELECT_SERVER (state, payload) {
    state.selected = payload
  },
  REMOVE_SERVER (state, payload) {
    let index = state.all.indexOf(payload)
    if (index > -1) state.all.splice(index, 1)
  },
  CLEAR_SERVERS (state) {
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
