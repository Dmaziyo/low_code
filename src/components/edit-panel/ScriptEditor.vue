<template>
  <div>
    <span v-if="!this.editingElement">请先选择一个元素</span>
    <div v-else>
      <a-button disabled @click="mixinScript">使用脚本</a-button>
      <a-textarea :rows="12" placeholder="Basic Usage" v-model="editorContent"></a-textarea>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      editorContent: `return {
      editorMethods: {              // 此项配置自定义方法的在组件配置面板如何展示
        projectJump1: {             // 方法名，对应于 methods 内的某方法
          label: '外部跳转1',        // 自定义方法显示名
          params: [                 // 参数列表，对象数组
            {
              label: '跳转地址',     // 参数1的名称
              desc: '项目相对地址',   // 参数1的描述
              type: 'string',       // 参数1的类型，支持string|number|boolean|array|object
              default: ''           // 参数1默认值
            },
            {
              label: '参数',
              desc: 'query形式参数',
              type: 'object',
              default: {}
            }
          ]
        }
      },
      methods:{
        projectJump1:function(url, query){
          console.log(url, query)
          let win = window.open(url, '_blank')
          win.focus()
             }
         }
       }`
    }
  },
  computed: {
    ...mapState('element', ['editingElement'])
  },
  methods: {
    ...mapActions('element', ['setEditingElement']),
    mixinScript() {}
  }
}
</script>

<style>
</style>