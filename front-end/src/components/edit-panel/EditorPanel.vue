<script>
// 渲染组件编辑器
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('editor', ['editingElement', 'editingElementEditorConfig'])
  },
  methods: {
    /**
     * 将插件的自定义增强编辑器注入属性面板中
     */
    mixinPluginCustomComponents2Editor() {
      const { components } = this.editingElementEditorConfig
      for (const key in components) {
        if (this.$options.components[key]) return
        this.$options.components[key] = components[key]
      }
    },
    ...mapActions('editor', ['setEditingElement'])
  },
  render(h) {
    if (!this.editingElement) return <span>请先选择一个元素</span>
    const editingElement = this.editingElement
    this.mixinPluginCustomComponents2Editor()
    // 直接从state中获取propsConfig
    const propsConfig = this.editingElementEditorConfig.propConfig
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