import Vue from 'vue'

export function getEditorConfigForEditingElement(elementName) {
  const Ctor = Vue.component(elementName)
  // 获取component的参数
  return new Ctor().$options.editorConfig
}
