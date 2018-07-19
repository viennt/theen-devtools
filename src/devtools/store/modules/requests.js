// initial state
const state = {
  all: [],
  selected: undefined
}

// getters
const getters = {
  allRequests: state => state.all.filter(data => !!data),
  selectedRequest: state => state.selected
}

// actions
const actions = {
  addRequest ({ commit }, request) {
    commit('PUSH_REQUEST', request)
  },
  selectRequest ({ commit }, request) {
    commit('SELECT_REQUEST', request)
  },
  removeRequest ({ commit }, request) {
    commit('REMOVE_REQUEST', request)
  },
  clearRequests ({ commit }) {
    commit('CLEAR_REQUESTS')
  }
}

// mutations
const mutations = {
  PUSH_REQUEST (state, payload) {
    state.all.push(payload)
  },
  SELECT_REQUEST (state, payload) {
    state.selected = payload
  },
  REMOVE_REQUEST (state, payload) {
    let index = state.all.indexOf(payload)
    if (index > -1) state.all.splice(index, 1)
  },
  CLEAR_REQUESTS (state) {
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
