<template>
  <!-- PreView -->
  <div style="{height:100%}">
    <component
      v-for="(element,index) in elements"
      :key="index"
      :is="element.name"
      :style="element.getStyle('absolute')"
      v-bind="element.pluginProps"
    ></component>
  </div>
</template>

<script>
export default {
  props: {
    elements: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss">
</style>