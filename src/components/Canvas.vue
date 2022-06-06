<template>
  <!-- 画布 -->
  <div style="{height:100%}">
    <component
      v-for="(element,index) in elements"
      :key="index"
      :is="element.name"
      :style="element.getStyle()"
      @click.native="parentD.setCurrentEditingElement(element)"
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