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
      <el-form ref="form" label-width="80px">
        {Object.keys(propsConfig).map(propKey => {
          const item = propsConfig[propKey]
          const data = {
            props: {
              ...item.prop,
              value: editingElement[propKey] || item.defaultPropValue
            },
            on: {
              input(value) {
                editingElement[propKey] = value
              }
            }
          }
          return <el-form-item label={item.label}>{h(item.type, data)}</el-form-item>
        })}
      </el-form>
    )
  }
}
</script>

<style>
</style>