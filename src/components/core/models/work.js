/**work model
 * title:标题
 * description:描述
 * pages:当前作品所有页面
 * type: 作品类型
 * id: 作品 id
 * coverImageUrl:封面地址
 * createTime: 创建时间
 * updateTime: 更新时间
 */
class Work {
  constructor(work = {}) {
    this.title = work.title || '标题'
    this.description = work.description || '描述'
    this.pages = work.pages || []
    this.type = work.type || 'h5'
    this.work = work

    this.id = work.id
    this.coverImageUrl = ''
    this.isPublish = false
    this.createTime = +new Date()
    this.updateTime = +new Date()
  }
}

export default Work
