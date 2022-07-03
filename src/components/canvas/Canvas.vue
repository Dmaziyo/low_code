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
      :style="element.getStyle('absolute')"
      :defaultPosition="element.commonStyle"
      :active="editingElement===element"
      :handleElementMoveProp="handleElementMove"
      :handleElementMouseUpProp="recordElementRect"
      :handlePointMouseUpProp="recordElementRect"
    >
      <component
        class="element-on-edit-canvas"
        :is="element.name"
        :style="{height:'100%',width:'100%'}"
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
      <!-- Menu bar -->
      <a-menu-item
        v-for="option in contextMenuOptions"
        :key="option.value"
        :data-command="option.value"
        @click="elementManager({type:option.value})"
      >{{option.label}}</a-menu-item>
    </a-menu>
  </div>
</template>

<script>
import Shape from '@/components/core/support/Shape.vue'
import { mapState, mapActions } from 'vuex'
export default {
  components: {
    Shape
  },
  data: () => ({
    // 数组用于动态显示
    vLines: [],
    hLines: [],
    // 设置menu坐标出现位置
    contextmenuPos: [],
    contextMenuOptions: [
      {
        label: '复制',
        value: 'copy'
      },
      {
        label: '删除',
        value: 'delete'
      },
      {
        label: '置顶',
        value: 'bring2Top'
      },
      {
        label: '置底',
        value: 'bring2Bottom'
      },
      {
        label: '上移',
        value: 'addZindex'
      },
      {
        label: '下移',
        value: 'minusZindex'
      }
    ]
  }),
  props: {
    elements: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapState('element', ['editingElement'])
  },
  methods: {
    clickEle(element) {
      this.$emit('clickEle', element)
    },
    // 画辅助线
    drawVLine(newLeft) {
      // 添加吸附效果
      this.setElementPosition({ left: newLeft })
      this.vLines = [newLeft + 'px']
    },
    drawHLine(newTop) {
      // 添加吸附效果
      this.setElementPosition({ top: newTop })
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
    handleElementMove(pos) {
      // 移动元素位置
      this.setElementPosition(pos)
      this.calcX(pos.left)
      this.calcY(pos.top)
    },
    bindContextMenu(e) {
      e.preventDefault() // 阻止默认右键菜单显示
      // 判断是否为右键plugin
      if (e.target.classList.contains('element-on-edit-canvas') || e.target.parentElement.classList.contains('element-on-edit-canvas')) {
        const { x, y } = this.$el.getBoundingClientRect()
        this.contextmenuPos = [e.clientX - x, e.clientY - y]
      } else {
        this.hideContextMenu()
      }
    },
    hideContextMenu() {
      this.contextmenuPos = []
    },
    // Reset Editing Element
    clickCanvas(e) {
      if (!e.target.classList.contains('element-on-edit-canvas')) {
        this.setEditingElement(null)
      }
      this.hideContextMenu()
    },
    ...mapActions('element', ['setEditingElement', 'setElementPosition', 'setElementShape', 'elementManager', 'recordElementRect'])
  }
}
</script>

<style lang="scss">
</style>