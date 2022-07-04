import Page from '../../components/core/models/page'

// getters
export const getters = {}

// actions
export const actions = {
  setEditingPage({ commit }, payload) {
    commit('setEditingPage', payload)
  },
  pageManager({ commit }, payload) {
    commit('pageManager', payload)
  }
}

// mutations
export const mutations = {
  setEditingPage(state, payload) {
    payload = payload || state.work.pages[0]
    state.editingPage = payload
  },
  pageManager(state, { type, value }) {
    switch (type) {
      case 'add': {
        const page = new Page(value)
        state.work.pages.push(page)
        break
      }
      case 'copy': {
        state.work.pages.push(state.editingPage.clone())
        break
      }
      case 'delete': {
        const { pagesOfCurrentWork, editingPage } = state
        let index = pagesOfCurrentWork.findIndex(e => e.uuid === editingPage.uuid)
        if (index !== -1) {
          let newPages = pagesOfCurrentWork.slice()
          newPages.splice(index, 1)
          state.work.pages = newPages
        }
        break
      }
      default:
    }
  }
}
