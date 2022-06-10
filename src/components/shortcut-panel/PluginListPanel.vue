

<script>
import ShortcutButton from '@/components/shortcut-panel/ShortCutButton.vue'
export default {
  props: {
    visiblePluginList: {
      type: Array,
      default: () => []
    }
  },
  components: {
    ShortcutButton
  },
  methods: {
    Eclone(item) {
      this.$emit('Eclone', item)
    },
    // 渲染
    renderPluginShortcut(group) {
      return group.children.length === 1 ? this.renderSinglePluginShortcut(group) : this.renderMultiPluginShortCuts(group)
    },
    // 渲染单组件group
    renderSinglePluginShortcut({ children }) {
      const [plugin] = children
      return <ShortcutButton faIcon={plugin.icon} title={plugin.title} clickFn={this.Eclone.bind(this, plugin)}></ShortcutButton>
    },
    renderMultiPluginShortCuts(group) {
      const plugins = group.children
      return (
        <a-popover placement="bottom" trigger="hover">
          <a-row gutter={20} style={{ width: '400px' }} slot="content">
            {plugins.sort().map(item => (
              <a-col span={6}>
                <ShortcutButton faIcon={item.icon} title={item.title} clickFn={this.Eclone.bind(this, item)}></ShortcutButton>
              </a-col>
            ))}
          </a-row>

          <ShortcutButton faIcon={group.icon} title={group.title}></ShortcutButton>
        </a-popover>
      )
    }
  },
  render() {
    return (
      <a-row gutter={20}>
        {this.visiblePluginList.sort().map(group => (
          <a-col span={12} style="margin-top:10px">
            {this.renderPluginShortcut(group)}
          </a-col>
        ))}
      </a-row>
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