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
        <a-menu-item key="4" class="transparent-bg">
          <a-button-group>
            <a-button
              class="transparent-bg"
              style="color:white"
              type="dashed"
              size="small"
              @click="unDo"
            >
              <i class="shortcut-icon fa fa-mail-reply" aria-hidden="true" />撤销
            </a-button>
            <a-button
              class="transparent-bg"
              style="color:white"
              type="dashed"
              size="small"
              @click="reDo"
            >
              <i class="shortcut-icon fa fa-mail-forward" aria-hidden="true" />重做
            </a-button>
          </a-button-group>
        </a-menu-item>
        <a-menu-item key="1" class="transparent-bg">
          <a-button type="primary" size="small">预览</a-button>
        </a-menu-item>
        <a-menu-item key="2" class="transparent-bg">
          <a-button size="small" @click="saveWork">保存</a-button>
        </a-menu-item>
        <a-menu-item key="3" class="transparent-bg">
          <a-button size="small">发布</a-button>
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="160" style="background: #fff">
        <a-menu
          @select="val=>{this.activeMenuKey=val.key}"
          mode="inline"
          :default-selected-keys="['pluginList']"
          style="height:100%;borderRight:1"
        >
          <a-menu-item v-for="menu in sidebarMenus" :key="menu.value">
            <a-icon :type="menu.antIcon" />
            <span>{{menu.label}}</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout-sider width="240" theme="light" style="background:#fff;padding:0 12px">
        <!-- 根据activeKey来切换选中值 -->
        <plugin-list-panel
          v-if="this.sidebarMenus[0].value===this.activeMenuKey"
          @Eclone="clone"
          :plugins-list="pluginsList"
        ></plugin-list-panel>
        <page-list-panel v-else-if="this.sidebarMenus[1].value===this.activeMenuKey"></page-list-panel>
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
            <edit-canvas :elements="elements" v-if="!isPreviewMode"></edit-canvas>
            <pre-view :elements="elements" v-else></pre-view>
          </div>
        </a-layout-content>

        <!-- 修改宽度和间隔 -->
        <a-layout-sider width="340" theme="light" style="background:#fff; padding:0 12px">
          <a-tabs
            type="card"
            style="height:100% ;overflow-y:auto"
            :tabBarGutter="10"
            @change="(activeTabKey)=>{this.activeTabKey=activeTabKey}"
          >
            <a-tab-pane key="属性">
              <span slot="tab">
                <a-icon type="apple" />属性
              </span>
              <editor-panel :editing-element="editingElement"></editor-panel>
            </a-tab-pane>
            <a-tab-pane key="动画" tab="动画">动画</a-tab-pane>
            <a-tab-pane key="动作" tab="动作">
              <action-editor></action-editor>
            </a-tab-pane>
            <a-tab-pane key="脚本" tab="脚本">
              <script-editor></script-editor>
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

import EditCanvas from '@/components/canvas/Canvas.vue'
import PreView from '@/components/canvas/PreView.vue'
import PluginListPanel from '@/components/shortcut-panel/PluginListPanel.vue'
import ScriptEditor from '@/components/edit-panel/ScriptEditor.vue'
import ActionEditor from '@/components/edit-panel/ActionEditor.vue'
import EditorPanel from '@/components/edit-panel/EditorPanel.vue'
import PageListPanel from '@/components/page-panel/page-panel.vue'
import undoRedoHistory from '@/store/plugins/undo-redo/History.js'
import { getEditorConfigForEditingElement } from '@/utils/element.js'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Editor',
  components: {
    EditorPanel,
    EditCanvas,
    PluginListPanel,
    PreView,
    ScriptEditor,
    ActionEditor,
    PageListPanel
  },
  data() {
    return {
      activeMenuKey: 'pluginList',
      sidebarMenus: [
        {
          label: '组件列表',
          value: 'pluginList',
          antIcon: 'bars'
        },
        {
          label: '页面管理',
          value: 'pageManagement',
          antIcon: 'snippets'
        },
        {
          label: '免费模板',
          value: 'freeTemplate',
          antIcon: 'appstore'
        }
      ],
      isPreviewMode: false,
      activeTabKey: '属性'
    }
  },
  computed: {
    ...mapState('editor', {
      editingElement: state => state.editingElement,
      elements: state => state.editingPage.elements,
      pages: state => state.work.pages
    })
  },
  methods: {
    ...mapActions('editor', ['elementManager', 'pageManager', 'saveWork', 'createWork', 'fetchWork']),

    /**
     * 复制插件的基本数据至组件树中，即elements
     */
    clone({ name }) {
      console.log(name, '1111111111111111111')
      // zindex根据elements长度进行增加,这个clone是添加
      const zindex = this.elements.length + 1
      // 获取component的defaultEditProp
      const editorConfig = getEditorConfigForEditingElement(name)
      // 添加新元素
      this.elementManager({
        type: 'add',
        value: { name, zindex, editorConfig }
      })
    },
    unDo() {
      undoRedoHistory.undo()
    },
    reDo() {
      undoRedoHistory.redo()
    }
  },
  /**
   * 初始化work,editingPage,并且跳转页面
   */
  created() {
    let workId = this.$route.query.workId
    if (workId) {
      this.fetchWork(workId)
    } else {
      this.createWork()
    }
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