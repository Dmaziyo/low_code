import { cloneDeep } from 'lodash'

class UndoRedoHistory {
  /**
   * vuex的store
   * 以及history历史记录和当前所处状态
   */
  store
  history = []
  currentIndex = -1

  // 判断是否能撤销
  get canUndo() {
    return this.currentIndex > 0
  }

  //   判断是否能取消撤销
  get canRedo() {
    return this.history.length > this.currentIndex + 1
  }
  init(store) {
    this.store = store
  }

  addState(state) {
    // 如果是在之前的state状态中进行了操作，那么就直接截掉后面的所有的state
    if (this.currentIndex + 1 < this.history.length) {
      this.history.splice(this.currentIndex + 1)
    }
    this.history.push(state)
    this.currentIndex++
  }

  //撤销
  undo() {
    if (!this.canUndo) return
    const prevState = this.history[this.currentIndex - 1]
    //替换State
    this.store.replaceState(cloneDeep(prevState))
    this.currentIndex--
  }
  //取消撤销
  redo() {
    if (!this.canRedo) return
    const nextState = this.history[this.currentIndex + 1]
    this.store.replaceState(cloneDeep(nextState))
    this.currentIndex++
  }
}

const undoRedoHistory = new UndoRedoHistory()

export default undoRedoHistory
