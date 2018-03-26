// initial state
const state = {
  websocket: null,
  socketState: 3, // 0: Connecting, 1: Connected, 3: Closed
  socketMessage: ''
}

// getters
const getters = {
  websocket: state => state.websocket,
  socketState: state => state.socketState
}

// actions
const actions = {
  setWebsocket ({ commit }, websocket) {
    commit('SET_WEBSOCKET', websocket)
  },
  setSocketState ({ commit }, state) {
    commit('SET_WEBSOCKET_STATE', state)
  }
}

// mutations
const mutations = {
  SET_WEBSOCKET (state, payload) {
    state.websocket = payload
  },
  SET_WEBSOCKET_STATE (state, payload) {
    state.socketState = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
