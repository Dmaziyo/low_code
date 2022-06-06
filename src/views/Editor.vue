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
        <editor-panel></editor-panel>
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
// 组件模型,没有怎么懂
class Element {
  constructor(ele) {
    const { defaultPropsValue = {} } = ele
    this.type = ele.name
    this.name = ele.name
    this.zindex = ele.zindex || defaultPropsValue.zindex || 1
    this.style = {
      top: ele.top || defaultPropsValue.top || 100,
      left: ele.left || defaultPropsValue.left || 100,
      ...defaultPropsValue
    }
  }
  getStyle() {}
  getClass() {}
  getData() {}
}
import EditCanvas from '@/components/Canvas'
import PluginListPanel from '@/components/PluginListPanel'
import Vue from 'vue'
export default {
  name: 'Editor',
  components: {
    //   这个是右边编辑栏的
    EditorPanel: {
      template: `<div>Editor Panel</div>`
    },
    EditCanvas,
    PluginListPanel
  },
  data: () => ({
    pages: [],
    elements: []
  }),
  computed: {
    visiblePluginList() {
      return PluginList.filter(p => p.visible)
    }
  },
  methods: {
    /**
     * 复制插件的基本数据至组件树中，即elements
     */
    clone({ name }) {
      console.log('响应成功', name)
      const zindex = this.elements.length + 1
      // 获取编辑器配置
      const defaultPropsValue = this.getPropsDefaultValue(name)
      this.elements.push(new Element({ name, zindex, defaultPropsValue }))
    },
    setCurrentEditingElement(element) {
      console.log(element)
    },
    // 这个默认值是从编辑栏获取后然后再设置到组件中去
    getPropsDefaultValue(pluginName) {
      const defaultPropsValue = {}
      // 获取局部注册Component
      const component = this.$options.components[pluginName]
      // 获取组件编辑栏配置
      const propConfig = component.editorConfig.propConfig
      Object.keys(propConfig).forEach(key => {
        defaultPropsValue[key] = propConfig[key].widgetProps.value
      })
      return defaultPropsValue
    },
    mixinPlugins2Editor() {
      PluginList.forEach(plugin => {
        Vue.component(plugin.name, plugin.component)
        this.$options.components[plugin.name] = plugin.component
      })
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