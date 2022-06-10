<template>
  <!-- Canvas -->
  <div style="{height:100%}">
    <component
      v-for="(element,index) in elements"
      :key="index"
      :is="element.name"
      :style="element.getStyle()"
      v-bind="element.pluginProps"
      @click.native="clickEle(element)"
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
  methods: {
    clickEle(element) {
      this.$emit('clickEle', element)
    }
  }
}
</script>

<style lang="scss">
</style>