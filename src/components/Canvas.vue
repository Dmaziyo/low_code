<template>
  <!-- 画布 -->
  <div style="{height:100%}">
    <component
      v-for="(element,index) in elements"
      :key="index"
      :is="element.name"
      :style="{top:'100px',
      fontSize:'16px',
      textAlign:'center',
      color:'orange',
      width:'100px',
      height:'30px',
      position:'absolute'}"
      @click="parentD.setCurrentEditingElement.bind(this, element)"
    ></component>
  </div>
</template>

<script>
import LbpButton from '@/components/LbpButton.vue'
const PluginList = [
  {
    title: '按钮',
    icon: 'hand-pointer-0',
    component: LbpButton,
    visible: true,
    name: 'lbp-button'
  }
]
export default {
  data: () => ({
    parentD: {}
  }),
  props: {
    elements: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    mixinPlugins2Editor() {
      PluginList.forEach(plugin => {
        this.$options.components[plugin.name] = plugin.component
      })
    }
  },
  created() {
    this.parentD = this.$parent
    this.mixinPlugins2Editor()
  }
}
</script>

<style lang="scss">
</style>