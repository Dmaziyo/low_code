import Element from './element'
/**
 * 页面模型
 * elements:当前页面的所有plugin
 */
class Page {
  constructor(page = {}) {
    // markup page
    this.uuid = +new Date()
    this.elements = page.elements || []
  }
  clone() {
    // element 会优先进行pluginProp的复制
    const elements = this.elements.map(element => new Element(element))
    return new Page({ elements })
  }
}
export default Page
