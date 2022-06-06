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
  created() {
    this.parentD = this.$parent
  }
}
</script>

<style lang="scss">
</style>