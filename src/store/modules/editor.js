import Work from '@/components/core/models/work.js'
import { actions as pageActions, mutations as pageMutations } from '@/store/modules/page.js'
import { actions as elementActions, mutations as elementMutations } from '@/store/modules/element.js'
import { actions as workActions, mutations as workMutations } from '@/store/modules/work.js'
// initial state
/**
 * Editor state
 * Work:{         //当前作品
 *  Pages:[       //当前作品所有页面
 *    Page1:{
 *      Elements  //所有Plugin
 *    },
 *    Page2:{
 *      Elements
 *    },
 *    ...
 *  ]
 * },
 * EditingPage    //当前页面
 * editingElement //当前编辑元素
 */
const state = {
  work: new Work(),
  editingPage: { elements: [] },
  editingElement: null
}
// getters
const getters = {}
//actions
const actions = {
  ...elementActions,
  ...pageActions,
  ...workActions,
  createWork({ commit }, payload) {
    commit('createWork')
    commit('pageManager', { type: 'add' })
    commit('setEditingPage')
    console.log(payload)
  }
}

// mutations
const mutations = {
  ...elementMutations,
  ...pageMutations,
  ...workMutations
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
