

<script>
import Vue from 'vue'
import LbpButton from '@/components/plugins/LbpButton.vue'
import CoreEditor from '@/components/core/CoreEditor.vue'
import LbpPicture from '@/components/plugins/LbpPicture.vue'
import LbpText from '@/components/plugins/LbpText.vue'
import LbpFormInput from '@/components/plugins/LbpFormInput.vue'
// 用于全局注册
const PluginList = [
  {
    title: '按钮',
    icon: 'hand-pointer-o',
    component: LbpButton,
    visible: true,
    name: 'lbp-button',
    children: [
      {
        title: '按钮',
        icon: 'hand-pointer-o',
        visible: true,
        name: 'lbp-button'
      }
    ]
  },
  {
    title: '图片',
    icon: 'image',
    component: LbpPicture,
    visible: true,
    name: 'lbp-picture',
    children: [
      {
        title: '图片',
        icon: 'image',
        component: LbpPicture,
        visible: true,
        name: 'lbp-picture'
      }
    ]
  },
  // 添加Form组件
  {
    title: '表单',
    icon: 'wpforms',
    visible: true,
    component: LbpFormInput,
    name: 'lbp-form-input',
    children: [
      {
        title: '输入框',
        icon: 'hand-pointer-o',
        component: LbpFormInput,
        visible: true,
        name: 'lbp-form-input'
      }
    ]
  },
  {
    title: '文字',
    icon: 'hand-pointer-o',
    component: LbpText,
    visible: true,
    name: 'lbp-text',
    children: [
      {
        title: '文字',
        icon: 'hand-pointer-o',
        component: LbpText,
        visible: true,
        name: 'lbp-text'
      }
    ]
  }
]

export default {
  extends: CoreEditor,

  computed: {
    // 可以显示在侧边栏的组件列表
    visiblePluginList() {
      return PluginList.filter(p => p.visible)
    },
    groups() {
      return PluginList.filter(p => p.visible)
    }
  },
  methods: {
    mixinPlugins2Editor() {
      PluginList.forEach(plugin => {
        // 全局注册Plugin
        console.log(plugin)
        Vue.component(plugin.name, plugin.component)
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
  background: #fff;
}
</style>