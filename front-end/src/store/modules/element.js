import Element from '@/components/core/models/element.js'
import { getEditorConfigForEditingElement } from '../../utils/element'
//actions
export const actions = {
  setEditingElement({ commit }, payload) {
    commit('setEditingElement', payload)
    // 在选中的时候就获取EditorConfig,然后将值传过去
    const vm = payload && payload.name ? getEditorConfigForEditingElement(payload.name) : null
    commit('setEditingElementEditorConfig', vm)
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
export const mutations = {
  setEditingElement(state, payload) {
    state.editingElement = payload
  },
  setEditingElementEditorConfig(state, payload) {
    // 将ElementEditorConfig赋给state中
    state.editingElementEditorConfig = payload
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
      // 添加元素到当前页面
      case 'add': {
        const element = new Element(value)
        state.editingPage.elements.push(element)
        break
      }
      case 'copy': {
        // 复制元素到当前页面
        console.log(state.editingElement)
        state.editingPage.elements.push(state.editingElement.clone())
        break
      }
      case 'delete': {
        // find editing element and delete it
        const { editingPage, editingElement } = state
        let index = editingPage.elements.findIndex(e => e.uuid === editingElement.uuid)
        if (index !== -1) {
          let newElements = editingPage.elements.slice()
          newElements.splice(index, 1)
          state.editingPage.elements = newElements
        }
        break
      }
      default:
    }
  },
  // 此阶段毫无用处
  recordRect() {}
}
