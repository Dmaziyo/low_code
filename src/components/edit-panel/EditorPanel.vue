<script>
// 渲染组件编辑器
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('element', ['editingElement'])
  },
  methods: {
    // Register custom component
    mixinPluginCustomComponents2Editor() {
      const { components } = this.editingElement.editorConfig
      for (const key in components) {
        if (this.$options.components[key]) return
        this.$options.components[key] = components[key]
      }
    },
    ...mapActions('element', ['setEditingElement'])
  },
  render(h) {
    if (!this.editingElement) return <span>请先选择一个元素</span>
    const editingElement = this.editingElement
    this.mixinPluginCustomComponents2Editor()
    const propsConfig = editingElement.editorConfig.propConfig
    return (
      <a-form ref="form" label-width="100px" id="props-edit-form" size="mini" label-position="left">
        {Object.keys(propsConfig).map(propKey => {
          const item = propsConfig[propKey]
          console.log(item.type)
          const data = {
            style: { width: '100%' },
            props: {
              ...item.prop,
              value: editingElement.pluginProps[propKey] || item.defaultPropValue
            },
            on: {
              change(e) {
                // 自定义组件可能会直接传值
                editingElement.pluginProps[propKey] = e.target ? e.target.value : e
              }
            }
          }
          //实现并排显示
          return (
            <a-form-item label={item.label} labelCol={{ span: 8 }} wrapperCol={{ span: 14, offset: 2 }}>
              {h(item.type, data)}
            </a-form-item>
          )
        })}
      </a-form>
    )
  }
}
</script>

<style>
</style>