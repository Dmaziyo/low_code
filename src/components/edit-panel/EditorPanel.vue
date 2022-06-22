<script>
// 渲染组件编辑器
export default {
  props: {
    editingElement: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    // Register custom component
    mixinPluginCustomComponents2Editor() {
      const { components } = this.editingElement.editorConfig
      for (const key in components) {
        if (this.$options.components[key]) return
        this.$options.components[key] = components[key]
      }
    }
  },
  render(h) {
    if (!this.editingElement) return <span>请先选择一个元素</span>
    const editingElement = this.editingElement
    this.mixinPluginCustomComponents2Editor()
    const propsConfig = editingElement.editorConfig.propConfig
    return (
      <a-form ref="form" label-width="100px" size="mini" label-position="left">
        {Object.keys(propsConfig).map(propKey => {
          const item = propsConfig[propKey]
          console.log(item.type)
          const data = {
            props: {
              ...item.prop,
              value: editingElement.pluginProps[propKey] || item.defaultPropValue
            },
            on: {
              change(e) {
                editingElement.pluginProps[propKey] = e.target ? e.target.value : e
              }
            }
          }
          return <a-form-item label={item.label}>{h(item.type, data)}</a-form-item>
        })}
      </a-form>
    )
  }
}
</script>

<style>
</style>