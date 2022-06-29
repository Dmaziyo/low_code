<script>
import { mapActions } from 'vuex'
const directionKey = {
  t: 'n',
  b: 's',
  l: 'w',
  r: 'e'
}
const points = ['lt', 'rt', 'lb', 'rb', 'l', 'r', 't', 'b']
export default {
  props: ['element', 'defaultPosition', 'active', 'handleMousedownProp', 'handleElementMoveProp', 'handlePointMoveProp'],
  computed: {
    position() {
      return { ...this.defaultPosition }
    }
  },
  methods: {
    //拖拽点的样式
    getPointStyle(point, isWrapElement = true) {
      const pos = this.position
      const top = pos.top
      const left = pos.left
      const height = pos.height
      const width = pos.width
      let hasT = /t/.test(point)
      let hasB = /b/.test(point)
      let hasL = /l/.test(point)
      let hasR = /r/.test(point)
      let newLeft = 0
      let newTop = 0
      // 上下左右四个点的位置
      if (point.length === 2) {
        newLeft = hasL ? 0 : width
        newTop = hasT ? 0 : height
      }
      // 中间的点
      else {
        // 上下点
        if (hasT || hasB) {
          newLeft = width / 2
          newTop = hasT ? 0 : height
        }
        // 左右点
        else if (hasL || hasR) {
          newTop = height / 2
          newLeft = hasL ? 0 : width
        }
      }
      const style = {
        left: `${newLeft + (isWrapElement ? 0 : left)}px`,
        top: `${newTop + (isWrapElement ? 0 : top)}px`,
        cursor:
          point
            .split('')
            .reverse()
            .map(m => directionKey[m])
            .join('') + '-resize'
      }
      return style
    },
    // prevent Bubble
    handlerWrapperClick(e) {
      e.stopPropagation()
      e.preventDefault()
    },
    // 点击拖拽点时的事件
    mousedownForMark(point, downEvent) {
      downEvent.stopPropagation()
      downEvent.preventDefault()
      const pos = { ...this.position }
      let height = pos.height
      let width = pos.width
      let top = pos.top
      let left = pos.left
      let startX = downEvent.clientX
      let startY = downEvent.clientY

      let move = moveEvent => {
        let currX = moveEvent.clientX
        let currY = moveEvent.clientY
        let disY = currY - startY
        let disX = currX - startX
        // 判断方位
        let hasT = /t/.test(point)
        let hasB = /b/.test(point)
        let hasL = /l/.test(point)
        let hasR = /r/.test(point)
        let newHeight = +height + (hasT ? -disY : hasB ? disY : 0)
        let newWidth = +width + (hasL ? -disX : hasR ? disX : 0)
        pos.height = newHeight > 0 ? newHeight : 0
        pos.width = newWidth > 0 ? newWidth : 0
        pos.left = +left + (hasL ? disX : 0)
        pos.top = +top + (hasT ? disY : 0)
        // 因为pos是新对象，无法改变element中的pos，所以需要通过调用actions来修改
        this.setElementPosition(pos)
      }
      let up = () => {
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
      }
      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', up)
    },
    // 拖拽元素
    mousedownForElement(e) {
      const pos = { ...this.position }
      let startX = e.clientX
      let startY = e.clientY
      let startTop = pos.top
      let startLeft = pos.left

      let move = moveEvent => {
        moveEvent.stopPropagation()
        moveEvent.preventDefault()
        let currX = moveEvent.clientX
        let currY = moveEvent.clientY

        pos.top = currY - startY + startTop
        pos.left = currX - startX + startLeft
        // 传递当前坐标
        this.handleElementMoveProp(pos)
      }
      let up = () => {
        document.removeEventListener('mousemove', move, true)
        document.removeEventListener('mouseup', up, true)
      }
      document.addEventListener('mousemove', move, true)
      document.addEventListener('mouseup', up, true)
      return true
    },
    //点击后修改editingElement以及控制移动
    handleMousedown(e) {
      this.setEditingElement(this.element)
      this.mousedownForElement(e, this.element)
    },
    ...mapActions('element', ['setEditingElement', 'setElementPosition'])
  },
  render() {
    return (
      <div
        onClick={this.handlerWrapperClick}
        onMousedown={this.handleMousedown}
        // extend plugin style
        style={this.element.getStyle('absolute')}
      >
        {this.active &&
          points.map(point => {
            const pointStyle = this.getPointStyle(point)
            return (
              // 遍历生成8个方位点
              <div
                key={point}
                data-point={point}
                style={pointStyle}
                class="shape__scale-point"
                onMousedown={e => {
                  this.mousedownForMark(point, e)
                }}
              ></div>
            )
          })}
        {this.$slots.default}
      </div>
    )
  }
}
</script>

<style>
</style>