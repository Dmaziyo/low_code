<script>
// 渲染组件编辑器
export default {
  props: {
    editingElement: {
      type: Object,
      default: () => {}
    }
  },
  render(h) {
    if (!this.editingElement) return <span>请先选择一个元素</span>
    const editingElement = this.editingElement
    const propsConfig = editingElement.editorConfig.propConfig
    return (
      <a-form ref="form" label-width="100px" size="mini" label-position="left">
        {Object.keys(propsConfig).map(propKey => {
          const item = propsConfig[propKey]
          const data = {
            props: {
              ...item.prop,
              value: editingElement.pluginProps[propKey] || item.defaultPropValue
            },
            on: {
              input(value) {
                editingElement.pluginProps[propKey] = value
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