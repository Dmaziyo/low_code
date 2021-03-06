const clone = value => JSON.parse(JSON.stringify(value))

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
    console.log('element元素', ele)
    this.commonStyle = {}
    // 这里优先获取ele.pluginProps实现属性的的复制

    // 在clone前先判断是否为空
    this.pluginProps = (typeof ele.pluginProps === 'object' && clone(ele.pluginProps)) || this.getDefaultPluginProps(ele.editorConfig || {})
    this.commonStyle = (typeof ele.commonStyle === 'object' && clone(ele.commonStyle)) || this.getDefaultCommonStyle(ele)

    // 添加了事件属性
    this.events = []
  }
  // 获取默认通用样式,以及初始化传的zindex
  getDefaultCommonStyle({ zindex }) {
    return { ...defaultProps, zindex }
  }
  // 获取默认插件样式
  getDefaultPluginProps(editorConfig) {
    const propConf = editorConfig.propConfig
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
  // 优化传参格式
  getStyle({ position = 'static' }) {
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
      zIndex: pluginProps.zindex || commonStyle.zindex,
      position
    }
    return style
  }
  // 根据edit&preview来确定input是否可以使用
  getProps({ mode = 'edit' } = {}) {
    console.log(this.pluginProps.placeholder)
    return {
      ...this.pluginProps,
      disabled: !(this.name === 'lbp-form-input' && mode === 'edit')
    }
  }
  getClass() {}
  getData() {}
  // 复制plugin
  clone({ zindex }) {
    return new Element({
      name: this.name,
      // 在构建函数内部会进行deep clone
      pluginProps: this.pluginProps,
      commonStyle: {
        ...this.commonStyle,
        top: this.commonStyle.top + 20,
        left: this.commonStyle.left + 20,
        zindex
      }
    })
  }
}
export default Element
