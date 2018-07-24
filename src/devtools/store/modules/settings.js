// initial state
const state = {
  maxLogsItems: 20,
  isRemovableLogItem: true
}

// getters
const getters = {
  maxLogsItems: state => state.maxLogsItems,
  isRemovableLogItem: state => state.isRemovableLogItem
}

// actions
const actions = {
  setMaxLogsItems ({ commit }, number) {
    commit('SET_MAX_LOG_ITEMS', number)
  },
  setIsRemovableLogItem ({ commit }, isShow) {
    commit('SET_IS_REMOVABLE_LOG_ITEM', isShow)
  }
}

// mutations
const mutations = {
  SET_MAX_LOG_ITEMS (state, payload) {
    state.maxLogsItems = payload
  },
  SET_IS_REMOVABLE_LOG_ITEM (state, payload) {
    state.isRemovableLogItem = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
