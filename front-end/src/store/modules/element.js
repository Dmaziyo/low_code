import Element from '@/components/core/models/element.js'
import { getEditorConfigForEditingElement, swapZindex } from '../../utils/element'
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
    state.editingElement.commonStyle = {
      ...state.editingElement.commonStyle,
      ...payload
    }
  },
  // menuClick管理
  elementManager(state, { type, value }) {
    // 简化数据名称
    const { editingPage, editingElement } = state
    const elements = editingPage.elements
    const len = elements.length
    switch (type) {
      // 添加元素到当前页面
      case 'add': {
        const element = new Element(value)
        elements.push(element)
        break
      }
      case 'copy': {
        // 复制元素->当前页面,这个clone是model里面的,进行复制时的zindex相同
        elements.push(editingElement.clone(editingElement.commonStyle))
        break
      }
      case 'delete': {
        // find editing element and delete it

        let index = elements.findIndex(e => e.uuid === editingElement.uuid)
        if (index !== -1) {
          let newElements = elements.slice()
          newElements.splice(index, 1)
          state.editingPage.elements = newElements
        }
        break
      }
      case 'move2Top':
      case 'move2Bottom': {
        const index = elements.findIndex(e => e.uuid === editingElement.uuid)
        elements.splice(index, 1)
        // 重新排序以及重写zindex
        const newElements = type === 'move2Top' ? [...elements, editingElement] : [editingElement, ...elements]
        newElements.forEach((ele, index) => {
          ele.commonStyle.zindex = index + 1
        })
        state.editingPage.elements = newElements
        break
      }
      case 'addZindex':
      case 'minusZindex': {
        const maxZindex = len
        const eleZindex = editingElement.commonStyle.zindex
        const flag = type === 'addZindex' ? 1 : -1

        // 判断能否进行位移
        if (flag === 1 ? eleZindex === maxZindex : eleZindex === 1) return
        // 与上一级或者下一级元素进行交换
        const swapElement = elements.find(ele => ele.commonStyle.zindex === eleZindex + flag)
        swapZindex(editingElement, swapElement)
        break
      }
      default:
    }
  },
  // 此阶段毫无用处
  recordRect() {}
}
