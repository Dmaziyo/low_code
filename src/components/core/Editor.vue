<template>
  <div style="height:100vh;">
    <div id="designer-page">
      <div class="el-col-5">
        <plugin-list-panel @Eclone="clone" :visible-plugin-list="visiblePluginList"></plugin-list-panel>
      </div>
      <div class="el-col-13">
        <div style="text-align:center">
          <el-radio-group v-model="isPreviewMode">
            <el-radio-button :label="false">Edit</el-radio-button>
            <el-radio-button :label="true">PreView</el-radio-button>
          </el-radio-group>
        </div>
        <div class="canvas-wrapper">
          <edit-canvas v-if="!isPreviewMode" :elements="elements"></edit-canvas>
          <pre-view v-else :elements="elements"></pre-view>
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
import LbpButton from '@/components/plugins/LbpButton.vue'

import Element from '@/components/core/models/element.js'
// 用于全局注册
const PluginList = [
  {
    title: '按钮',
    icon: 'hand-pointer-0',
    component: LbpButton,
    visible: true,
    name: 'lbp-button'
  }
]

import EditCanvas from '@/components/Canvas'
import PreView from '@/components/PreView.vue'
import PluginListPanel from '@/components/PluginListPanel'
import EditorPanel from '@/components/EditorPanel.vue'
import Vue from 'vue'
export default {
  name: 'Editor',
  components: {
    EditorPanel,
    EditCanvas,
    PluginListPanel,
    PreView
  },
  data() {
    return {
      pages: [],
      elements: [],
      editingElement: null,
      isPreviewMode: false
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
      //组件构造器
      const pluginCtor = Vue.component(pluginName)
      return new pluginCtor().$options.editorConfig
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

    // Register custom component
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