

<script>
// import PluginShortCut from '@/components/PluginShortCut.vue'
export default {
  props: {
    visiblePluginList: {
      type: Array,
      default: () => []
    }
  },
  components: {
    // PluginShortCut
  },
  methods: {
    Eclone(item) {
      this.$emit('Eclone', item)
    },
    renderPluginShortcut(group) {
      return group.children.length === 1 ? this.renderSinglePluginShortcut(group) : this.renderMultiPluginShortCuts(group)
    },
    // 渲染单组件group
    renderSinglePluginShortcut({ children }) {
      const [plugin] = children
      return (
        <el-button class="ma-0 no-border-radius" style={{ width: '100%', marginBottom: '10px' }} onClick={this.Eclone.bind(this, plugin)}>
          <i class={['fa', `fa-${plugin.icon}`]} aria-hidden="true" style="display: block;font-size: 16px;margin-bottom:10px;" />
          <span class="plugin-item__text">{plugin.title}</span>
        </el-button>
      )
    },
    renderMultiPluginShortCuts(group) {
      const plugins = group.children
      return (
        <el-popover placement="bottom" trigger="hover">
          {plugins.sort().map(item => (
            <el-button onClick={this.Eclone.bind(this, item)}>
              <i class={['fa', `fa-${item.icon}`]} aria-hidden="true" style="display: block;font-size: 16px;margin-bottom:10px;" />
              <span>{item.title}</span>
            </el-button>
          ))}

          <el-button slot="reference">
            <i class={['fa', `fa-${group.icon}`]} aria-hidden="true" style="display:block;font-size:16px;margin-bottom:10px;" />
            <span>{group.title}</span>
          </el-button>
        </el-popover>
      )
    }
  },
  render() {
    return (
      <el-tabs tab-position="left" class="lb-tabs">
        <el-tab-pane label="组件列表">
          <div class="full-height">
            <el-row gutter={20}>
              {this.visiblePluginList.sort().map(group => (
                <el-col span={12}>{this.renderPluginShortcut(group)}</el-col>
              ))}
            </el-row>
          </div>
        </el-tab-pane>
        <el-tab-pane label="页面管理">
          <span>页面管理</span>
        </el-tab-pane>
      </el-tabs>
    )
  }
}
</script>

<style lang="scss">
.plugin-item {
  border: 1px solid #f1efef;
  width: 49%;
  padding: 12px 12px;
  &:nth-child(even) {
    margin: 4px 0 4px 2% !important;
  }
}
.lb-tabs {
  box-shadow: none;
  padding: 4px 8px 4px 0;
  border: 1px solid #ebeef5;
  height: 100%;
}
.full-height {
  height: 100% !important;
}
</style>