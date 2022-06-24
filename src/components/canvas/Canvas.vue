<template>
  <!-- Canvas -->
  <div
    class="canvas-editor-wrapper"
    @click="clickCanvas"
    @contextmenu="bindContextMenu"
    style="position:relative; height:100%"
  >
    <Shape
      v-for="(element,index) in elements"
      :key="index"
      :element="element"
      :editingElement="editingElement"
      :active="editingElement===element"
      :handleMousedownProp="handleClickElementProp.bind(this,element)"
      :handleElementMoveProp="handleElementMove"
    >
      <component
        class="element-on-edit-canvas"
        :is="element.name"
        :style="element.getStyle()"
        @input="({value,pluginName})=>{
          if(pluginName==='lbp-text'){
            element.pluginProps.text=value
          }
        }"
        v-bind="element.pluginProps"
      ></component>
    </Shape>
    <div
      class="v-line"
      v-for="(v_left,index) in vLines"
      :key="'vline'+index"
      :style="{left:v_left}"
    ></div>
    <div class="h-line" v-for="(v_top,index) in hLines" :key="'hline'+index" :style="{top:v_top}"></div>
    <a-menu
      v-if="contextmenuPos.length>0"
      :style="{
        left:this.contextmenuPos[0]+'px',
        top:this.contextmenuPos[1]+'px',
        userSelect:'none',position:'absolute',
        zIndex:999
        }"
    >
      <a-menu-item data-command="copyEditingElement">复制</a-menu-item>
      <a-menu-item data-command="deleteEditingElement">删除</a-menu-item>
      <a-menu-item data-command="bringLayer2Front">置顶</a-menu-item>
      <a-menu-item data-command="bringLayer2End">置地</a-menu-item>
      <a-menu-item data-command="addLayerZindex">上移</a-menu-item>
      <a-menu-item data-command="subtractLayerZindex">下移</a-menu-item>
    </a-menu>
  </div>
</template>

<script>
import Shape from '@/components/core/support/Shape.vue'
export default {
  components: {
    Shape
  },
  data: () => ({
    // 数组用于动态显示
    vLines: [],
    hLines: [],
    contextmenuPos: []
  }),
  props: {
    elements: {
      type: Array,
      default: () => []
    },
    handleClickElementProp: {
      type: Function
    },
    editingElement: {
      type: Object,
      default: () => {}
    },
    handleClickCanvasProp: {
      type: Function
    }
  },
  methods: {
    clickEle(element) {
      this.$emit('clickEle', element)
    },
    drawVLine(newLeft) {
      this.vLines = [newLeft + 'px']
    },
    drawHLine(newTop) {
      this.hLines = [newTop + 'px']
    },
    //  计算是否交叠
    calcX(newLeft) {
      const uuid = this.editingElement.uuid
      let xCoords = []
      // 计算其他plugin的left坐标
      this.elements
        .filter(e => e.uuid !== uuid)
        .forEach(e => {
          const width = e.commonStyle.width
          const left = e.commonStyle.left
          xCoords = [...xCoords, left, left + width / 2, left + width]
        })
      xCoords.some(x => {
        if (Math.abs(newLeft - x) <= 5) {
          this.drawVLine(x)
          return true
        } else {
          this.vLines = []
        }
      })
    },
    calcY(newTop) {
      const uuid = this.editingElement.uuid
      let yCoords = []
      this.elements
        .filter(e => e.uuid !== uuid)
        .forEach(e => {
          const height = e.commonStyle.height
          const top = e.commonStyle.top
          yCoords = [...yCoords, top, top + height / 2, top + height]
        })
      yCoords.some(y => {
        if (Math.abs(newTop - y) <= 5) {
          this.drawHLine(y)
          return true
        } else {
          this.hLines = []
        }
      })
    },

    /**
     * 元素移动时，计算并生成辅助线
     */
    handleElementMove({ top, left }) {
      this.calcX(left)
      this.calcY(top)
    },
    bindContextMenu(e) {
      e.preventDefault() // 阻止默认右键菜单显示
      // 判断是否为右键plugin
      if (e.target.classList.contains('element-on-edit-canvas') || e.target.parentElement.classList.contains('element-on-edit-canvas')) {
        const { x, y } = this.$el.getBoundingClientRect()
        console.log('111111111111')
        this.contextmenuPos = [e.clientX - x, e.clientY - y]
      } else {
        this.hideContextMenu()
      }
    },
    hideContextMenu() {
      this.contextmenuPos = []
    },
    clickCanvas(e) {
      this.handleClickCanvasProp(e)
      this.hideContextMenu()
    }
  }
}
</script>

<style lang="scss">
</style>