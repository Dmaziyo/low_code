

<script>
import Vue from 'vue'
import LbpButton from '@/components/plugins/LbpButton.vue'
import CoreEditor from '@/components/core/Editor.vue'
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

export default {
  extends: CoreEditor,

  computed: {
    visiblePluginList() {
      return PluginList.filter(p => p.visible)
    }
  },
  methods: {
    mixinPlugins2Editor() {
      PluginList.forEach(plugin => {
        // 全局注册组件
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
}
</style>