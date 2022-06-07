<template>
  <div style="height:100vh;">
    <div id="designer-page">
      <div class="el-col-5">
        <plugin-list-panel @Eclone="clone" :visible-plugin-list="visiblePluginList"></plugin-list-panel>
      </div>
      <div class="el-col-13">
        <div class="canvas-wrapper">
          <edit-canvas :elements="elements"></edit-canvas>
        </div>
      </div>
      <div class="el-col-6">
        <editor-panel :editing-element="editingElement"></editor-panel>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 自定义button组件
 * 自身需要props属性来修改，还需要同时配置编辑栏属性修改组件
 */
// 组件列表
import LbpButton from '@/components/LbpButton.vue'
const PluginList = [
  {
    title: '按钮',
    icon: 'hand-pointer-0',
    component: LbpButton,
    visible: true,
    name: 'lbp-button'
  }
]
const defaultProps = {
  top: 100,
  left: 100,
  width: 100,
  height: 40,
  zindex: 1,
  textAlign: 'center',
  color: '#000000',
  backgroundColor: '#ffffff',
  fontSize: 14
}
/**
 * 组件模型
 * getStyle:获取所有样式
 * getClass:获取所有类
 * getData:获取数据文本
 */
class Element {
  constructor(ele) {
    // 这个this是新建立的对象了
    this.name = ele.name
    this.editorConfig = ele.editorConfig || {}
    this.init()
  }
  getStyle() {
    return {
      top: `${this.top}px`,
      left: `${this.left}px`,
      width: `${this.width}px`,
      height: `${this.height}px`,
      fontSize: `${this.fontSize}px`,
      color: this.color,
      backgroundColor: this.backgroundColor,
      borderWidth: `${this.borderWidth}px`,
      borderRadius: `${this.borderRadius}px`,
      textAlign: this.textAlign
    }
  }
  getClass() {}
  getData() {}
  // 初始化默认样式 & 默认编辑器样式
  init() {
    Object.keys(defaultProps).forEach(key => {
      this[key] = defaultProps[key]
    })
    // init prop of plugin
    this.pluginProps = {}
    const propConf = this.editorConfig.propConfig
    Object.keys(propConf).forEach(key => {
      // 因为this.name与组件名称绑定了
      if (key === 'name') {
        console.warn("please don't use name as  plugin prop")
        return
      }
      this.pluginProps[key] = propConf[key].defaultPropValue
    })
  }
}

import EditCanvas from '@/components/Canvas'
import PluginListPanel from '@/components/PluginListPanel'
import EditorPanel from '@/components/EditorPanel.vue'
import Vue from 'vue'
export default {
  name: 'Editor',
  components: {
    EditorPanel,
    EditCanvas,
    PluginListPanel
  },
  data() {
    return {
      pages: [],
      elements: [],
      editingElement: null
    }
  },
  computed: {
    visiblePluginList() {
      return PluginList.filter(p => p.visible)
    }
  },
  methods: {
    // 获取组件编辑器配置
    getEditorConfig(pluginName) {
      return this.$options.components[pluginName].editorConfig
    },
    /**
     * 复制插件的基本数据至组件树中，即elements
     */
    clone({ name }) {
      const zindex = this.elements.length + 1
      const editorConfig = this.getEditorConfig(name)
      this.elements.push(new Element({ name, zindex, editorConfig }))
    },
    setCurrentEditingElement(element) {
      this.editingElement = element
      this.mixinPluginCustomComponents2Editor()
    },

    // 注册el组件
    mixinPlugins2Editor() {
      PluginList.forEach(plugin => {
        Vue.component(plugin.name, plugin.component)
        this.$options.components[plugin.name] = plugin.component
      })
    },
    mixinPluginCustomComponents2Editor() {
      const { components } = this.editingElement.editorConfig
      for (const key in components) {
        if (this.$options.components[key]) return
        Vue.component(key, components[key])
        this.$options.components[key] = components[key]
      }
    }
  },
  created() {
    this.parentD = this.$parent
    this.mixinPlugins2Editor()
  }
}
</script>

<style lang="scss">
$cellSize: 35.6px;
$designerWidth: 320px;
$designerHeight: 568px;

// 为了能够调用el-col类
#designer-page {
  display: flex;
  min-height: calc(100% - 40px);
}
.canvas-wrapper {
  position: relative;
  top: 5%;
  width: $designerWidth;
  height: $designerHeight;
  border: 1px #ebeaea solid;
  margin: 0 auto;
}
</style>