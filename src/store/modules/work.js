import Work from '@/components/core/models/work.js'

export const actions = {
  // it's useless for now
  // 预览作品
  previewWork({ commit }, payload = {}) {
    commit('previewWork', payload)
  },
  deployWork({ commit }, payload = {}) {
    commit('previewWork', payload)
  },
  saveWork({ commit, state }, payload = {}) {
    console.log(commit)
    console.log(state)
    console.log(payload)
  }
}

// mutations
export const mutations = {
  //Create a work
  createWork(state) {
    state.work = new Work()
  },
  previewWork(state, { type, value }) {
    console.log(state)
    console.log(type, value)
  },
  deployWork(state, { type, value }) {
    console.log(state)
    console.log(type, value)
  }
}
