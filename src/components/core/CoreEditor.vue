<template>
  <a-layout id="luban-layout" style="height:100vh">
    <a-layout-header class="header">
      <div class="logo">鲁班 H5</div>
      <a-menu
        theme="dark"
        mode="horizontal"
        :default-selected-keys="['2']"
        style="line-height:64px;float:right;background:transparent"
      >
        <a-menu-item key="1" class="transparent-bg">
          <a-button type="primary" size="small">预览</a-button>
        </a-menu-item>
        <a-menu-item key="2" class="transparent-bg">
          <a-button size="small">保存</a-button>
        </a-menu-item>
        <a-menu-item key="3" class="transparent-bg">
          <a-button size="small">发布</a-button>
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="160" style="background: #fff">
        <a-menu :default-selected-keys="['2']" style="height:100%">
          <a-menu-item key="pluginList">
            <a-icon type="user" />
            <span>组件列表</span>
          </a-menu-item>
          <a-menu-item key="2">
            <a-icon type="video-camera" />

            <span>页面管理</span>
          </a-menu-item>
          <a-menu-item key="3">
            <a-icon type="upload" />
            <span>更多模板</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout-sider width="240" theme="light" style="background:#fff;padding:0 12px">
        <plugin-list-panel @Eclone="clone" :visible-plugin-list="visiblePluginList"></plugin-list-panel>
      </a-layout-sider>
      <a-layout style="padding:0 24px 24px">
        <a-layout-content style="padding:24px;margin:0,min-height:280px">
          <div style="text-align:center;">
            <a-radio-group v-model="isPreviewMode">
              <a-radio-button :value="false">Edit</a-radio-button>
              <a-radio-button :value="true">PreView</a-radio-button>
            </a-radio-group>
          </div>
          <div class="canvas-wrapper">
            <edit-canvas
              :handleClickCanvasProp="this.handleClickCanvasProp"
              :handleClickElementProp="setCurrentEditingElement"
              :editingElement="editingElement"
              :elements="elements"
              v-if="!isPreviewMode"
            ></edit-canvas>
            <pre-view :elements="elements" v-else></pre-view>
          </div>
        </a-layout-content>

        <a-layout-sider width="240" theme="light" style="background:#fff; padding:0 12px">
          <a-tabs type="card" style="height:100%">
            <a-tab-pane key="属性">
              <span slot="tab">
                <a-icon type="apple" />属性
              </span>
              <editor-panel :editing-element="editingElement"></editor-panel>
            </a-tab-pane>
            <a-tab-pane key="动画" tab="动画">
              <span slot="tab">
                <a-icon type="apple" />动画
              </span>
            </a-tab-pane>
            <a-tab-pane key="动作" tab="动作">
              <span slot="tab">
                <a-icon type="apple" />动作
              </span>
            </a-tab-pane>
          </a-tabs>
        </a-layout-sider>
      </a-layout>
    </a-layout>
  </a-layout>
</template>








<script>
/**
 * 自定义button组件
 * 自身需要props属性来修改，还需要同时配置编辑栏属性修改组件
 */
// 组件列表

import Element from '@/components/core/models/element.js'

import EditCanvas from '@/components/canvas/Canvas.vue'
import PreView from '@/components/canvas/PreView.vue'
import PluginListPanel from '@/components/shortcut-panel/PluginListPanel.vue'
import EditorPanel from '@/components/edit-panel/EditorPanel.vue'
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
      console.log(name)
      const zindex = this.elements.length + 1
      const editorConfig = this.getEditorConfig(name)
      console.log(editorConfig)
      this.elements.push(new Element({ name, zindex, editorConfig }))
    },
    // Set Editing Element
    setCurrentEditingElement(element) {
      this.editingElement = element
    },
    // Reset Editing Element
    handleClickCanvasProp(e) {
      if (!e.target.classList.contains('element-on-edit-canvas')) {
        this.editingElement = null
      }
    }
  },
  created() {
    this.parentD = this.$parent
  }
}
</script>

<style lang="scss"  src="@/components/core/styles/index.scss">
</style>

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