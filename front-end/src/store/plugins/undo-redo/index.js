import { cloneDeep } from 'lodash'
import undoRedoHistory from './History'
const unRecordHistoryMutationTypes = ['editor/setElementCommonStyle']

// exposes hooks for each mutation
const undoRedoPlugin = store => {
  undoRedoHistory.init(store)
  let firstState = cloneDeep(store.state)
  undoRedoHistory.addState(firstState)

  //目的是在复制或删除时重新修改state 记录
  store.subscribe((mutation, state) => {
    // called after every mutation.
    const { type } = mutation
    // 修改Types，因为样式的撤销很麻烦，我们只需要注重plugin的位置和出现顺序即可
    if (unRecordHistoryMutationTypes.includes(type)) return

    // 复制当前的state并且添加至history中
    undoRedoHistory.addState(cloneDeep(state))
  })
}

export default undoRedoPlugin
