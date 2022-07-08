import Vue from 'vue'

export function getEditorConfigForEditingElement(elementName) {
  const Ctor = Vue.component(elementName)
  // 获取component的参数
  return new Ctor().$options.editorConfig
}

const styleKey = 'commonStyle'
// 交换Zindex
export function swapZindex(x, y) {
  const tmp = y[styleKey].zindex
  y[styleKey].zindex = x[styleKey].zindex
  x[styleKey].zindex = tmp
}
