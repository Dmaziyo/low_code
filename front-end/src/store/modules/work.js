// import Work from '@/components/core/models/work.js'
import strapi from '../../utils/strapi'
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
    console.log(commit, payload)
    strapi.updateEntry('works', state.work.id, state.work)
  },
  // 创建一个作品
  createWork({ commit }, payload) {
    console.log(commit, payload)
    // 初始化的时候创建作品，并且默认选择第一个Page
    strapi.createEntry('works').then(entry => {
      console.log(entry, '数据创建')
      window.location = `${window.location.origin}/#/?workId=${entry.id}`
    })
  },
  // 获取作品
  fetchWork({ commit }, workId) {
    strapi.getEntry('works', workId).then(entry => {
      console.log(entry)
      commit('setWork', entry)
      commit('setEditingPage')
    })
  }
}

// mutations
export const mutations = {
  setWork(state, payload) {
    state.work = payload
    console.log(state.work, 'work!!!')
  },
  // //Create a work
  // createWork(state) {
  //   state.work = new Work()
  // },
  previewWork(state, { type, value }) {
    console.log(state)
    console.log(type, value)
  },
  deployWork(state, { type, value }) {
    console.log(state)
    console.log(type, value)
  }
}
