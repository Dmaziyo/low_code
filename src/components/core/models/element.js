const defaultProps = {
  top: 100,
  left: 100,
  width: 100,
  height: 40,
  zindex: 1,
  textAlign: 'center',
  color: '#000000',
  backgroundColor: '#ffffff',
  fontSize: 14
}

/**
 * 组件模型
 * getStyle:获取所有样式
 * getClass:获取所有类
 * getData:获取数据文本
 */
class Element {
  constructor(ele) {
    // 这个this是新建立的对象了
    this.name = ele.name
    this.editorConfig = ele.editorConfig || {}
    this.init()
  }
  getStyle() {
    const pluginProps = this.pluginProps
    let style = {
      top: `${this.top}px`,
      left: `${pluginProps.left || this.left}px`,
      width: `${pluginProps.width || this.width}px`,
      height: `${pluginProps.height || this.height}px`,
      fontSize: `${pluginProps.fontSize || this.fontSize}px`,
      color: pluginProps.color || this.color,
      backgroundColor: pluginProps.backgroundColor || this.backgroundColor,
      borderWidth: `${pluginProps.borderWidth || this.borderWidth}px`,
      borderRadius: `${pluginProps.borderRadius || this.borderRadius}px`,
      textAlign: pluginProps.textAlign || this.textAlign
    }
    return style
  }
  getClass() {}
  getData() {}
  // 初始化默认样式 & 默认编辑器样式
  init() {
    Object.keys(defaultProps).forEach(key => {
      this[key] = defaultProps[key]
    })
    // init prop of plugin
    this.pluginProps = {}
    const propConf = this.editorConfig.propConfig
    Object.keys(propConf).forEach(key => {
      // 因为this.name与组件名称绑定了
      if (key === 'name') {
        console.warn("please don't use name as  plugin prop")
        return
      }
      this.pluginProps[key] = propConf[key].defaultPropValue
    })
  }
}
export default Element
