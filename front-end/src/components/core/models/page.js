/**
 * 页面模型
 * elements:当前页面的所有plugin
 */
class Page {
  constructor(page = {}) {
    this.elements = page.elements || []
  }
}
export default Page
