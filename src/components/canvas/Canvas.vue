<template>
  <!-- Canvas -->
  <div
    class="canvas-editor-wrapper"
    @click="this.handleClickCanvasProp"
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
    hLines: []
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
    }
  }
}
</script>

<style lang="scss">
</style>