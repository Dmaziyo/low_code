import Element from '@/components/core/models/element.js'
import strapi from '../../utils/strapi'
import Page from '@/components/core/models/page.js'
export const actions = {
  // it's useless for now
  // 预览作品
  previewWork({ commit }, payload = {}) {
    commit('previewWork', payload)
  },
  // 部署作品
  deployWork({ commit }, payload = {}) {
    commit('previewWork', payload)
  },
  // 保存作品
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
  setWork(state, work) {
    // 确保element model数据完整
    work.pages = work.pages.map(page => {
      page.elements = page.elements.map(element => new Element(element))
      // 加编号
      return new Page(page)
    })
    state.work = work
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
