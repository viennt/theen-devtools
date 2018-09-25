// initial state
const state = {
  maxLogsItems: 20,
  isRemovableLogItem: true,
  isCopyableLogDetail: true,
  hasJsonTreeSection: true,
  jsonTreeObjectKey: 'jsonTreeData'
}

// getters
const getters = {
  maxLogsItems: state => state.maxLogsItems,
  isRemovableLogItem: state => state.isRemovableLogItem,
  isCopyableLogDetail: state => state.isCopyableLogDetail,
  hasJsonTreeSection: state => state.hasJsonTreeSection,
  jsonTreeObjectKey: state => state.jsonTreeObjectKey
}

// actions
const actions = {
  setMaxLogsItems ({ commit }, number) {
    commit('SET_MAX_LOG_ITEMS', number)
  },
  setIsRemovableLogItem ({ commit }, isShow) {
    commit('SET_IS_REMOVABLE_LOG_ITEM', isShow)
  },
  setIsCopyableLogDetail ({ commit }, isShow) {
    commit('SET_IS_COPYABLE_LOG_DETAIL', isShow)
  },
  setHasJsonTreeSection ({ commit }, isShow) {
    commit('SET_HAS_JSON_TREE_SECTION', isShow)
  },
  setJsonTreeObjectKey ({ commit }, isShow) {
    commit('SET_JSON_TREE_OBJECT_KEY', isShow)
  }
}

// mutations
const mutations = {
  SET_MAX_LOG_ITEMS (state, payload) {
    state.maxLogsItems = payload
  },
  SET_IS_REMOVABLE_LOG_ITEM (state, payload) {
    state.isRemovableLogItem = payload
  },
  SET_IS_COPYABLE_LOG_DETAIL (state, payload) {
    state.isCopyableLogDetail = payload
  },
  SET_HAS_JSON_TREE_SECTION (state, payload) {
    state.hasJsonTreeSection = payload
  },
  SET_JSON_TREE_OBJECT_KEY (state, payload) {
    state.jsonTreeObjectKey = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
