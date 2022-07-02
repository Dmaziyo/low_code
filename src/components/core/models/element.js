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
    this.uuid = +new Date()
    this.editorConfig = ele.editorConfig || {}
    this.commonStyle = {}
    // 删除init是因为如果点击复制会覆盖当前元素的样式
    this.pluginProps = ele.pluginProps || this.getDefaultPluginProps()
    this.commonStyle = ele.commonStyle || this.getDefaultCommonStyle()
  }
  // 获取默认通用样式
  getDefaultCommonStyle() {
    return { ...defaultProps }
  }
  // 获取默认插件样式
  getDefaultPluginProps() {
    const propConf = this.editorConfig.propConfig
    const pluginProps = {}
    Object.keys(propConf).forEach(key => {
      if (key === 'name') {
        console.warn('Please do not use {name} as plugin prop')
        return
      }
      pluginProps[key] = propConf[key].defaultPropValue
    })
    return pluginProps
  }

  getStyle(position = 'static') {
    const pluginProps = this.pluginProps
    const commonStyle = this.commonStyle
    let style = {
      // 因为pluginProp没有top和left,所以修改的是commonStyle
      top: `${pluginProps.top || commonStyle.top}px`,
      left: `${pluginProps.left || commonStyle.left}px`,
      width: `${pluginProps.width || commonStyle.width}px`,
      height: `${pluginProps.height || commonStyle.height}px`,
      fontSize: `${pluginProps.fontSize || commonStyle.fontSize}px`,
      color: pluginProps.color || commonStyle.color,
      // backgroundColor: pluginProps.backgroundColor || commonStyle.backgroundColor,
      borderWidth: `${pluginProps.borderWidth || commonStyle.borderWidth}px`,
      borderRadius: `${pluginProps.borderRadius || commonStyle.borderRadius}px`,
      textAlign: pluginProps.textAlign || commonStyle.textAlign,
      position
    }
    return style
  }
  getClass() {}
  getData() {}
  // 复制plugin
  clone() {
    return new Element({
      name: this.name,
      editorConfig: this.editorConfig,
      // Deep Clone
      pluginProps: JSON.parse(JSON.stringify(this.pluginProps)),
      commonStyle: {
        ...this.commonStyle,
        top: this.commonStyle.top + 20,
        left: this.commonStyle.left + 20
      }
    })
  }
}
export default Element
