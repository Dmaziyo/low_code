import Element from '@/components/core/models/element.js'
// initial state
const state = {
  editingElement: null,
  elementsOfCurrentPage: []
}

// getters
const getters = {}

//actions
const actions = {
  setEditingElement({ commit }, payload) {
    commit('setEditingElement', payload)
  },
  setElementPosition({ commit }, payload) {
    commit('setElementCommonStyle', payload)
  },
  setElementShape({ commit }, payload) {
    commit('setElementCommonStyle', payload)
  },
  elementManager({ commit }, payload) {
    commit('elementManager', payload)
  },
  // 此阶段是没有用的！
  recordElementRect({ commit }, payload = {}) {
    commit('recordRect', payload)
  }
}

// mutations
const mutations = {
  setEditingElement(state, payload) {
    state.editingElement = payload
  },
  setElementCommonStyle(state, payload) {
    console.log(state.editingElement)
    state.editingElement.commonStyle = {
      ...state.editingElement.commonStyle,
      ...payload
    }
  },
  // menuClick管理
  elementManager(state, { type, value }) {
    switch (type) {
      // 新建
      case 'add': {
        const element = new Element(value)
        state.elementsOfCurrentPage.push(element)
        break
      }
      case 'copy': {
        // 复制
        console.log(state.editingElement)
        state.elementsOfCurrentPage.push(state.editingElement.clone())
        break
      }
      case 'delete': {
        // find editing element and delete it
        const { elementsOfCurrentPage, editingElement } = state
        let index = elementsOfCurrentPage.findIndex(e => e.uuid === editingElement.uuid)
        if (index !== -1) {
          let newElements = elementsOfCurrentPage.slice()
          newElements.splice(index, 1)
          state.elementsOfCurrentPage = newElements
        }
        break
      }
      default:
    }
  },
  // 此阶段毫无用处
  recordRect() {}
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
