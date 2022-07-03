import { cloneDeep } from 'lodash'
import undoRedoHistory from './History'
const unRecordHistoryMutationTypes = ['element/setElementCommonStyle']

// exposes hooks for each mutation
const undoRedoPlugin = store => {
  undoRedoHistory.init(store)
  let firstState = cloneDeep(store.state)
  undoRedoHistory.addState(firstState)

  //目的是在复制或删除时重新修改state 记录
  store.subscribe((mutation, state) => {
    // called after every mutation.
    const { type } = mutation
    // 不会存储样式
    if (unRecordHistoryMutationTypes.includes(type)) return

    // 复制当前的state并且添加至history中
    undoRedoHistory.addState(cloneDeep(state))
  })
}

export default undoRedoPlugin
