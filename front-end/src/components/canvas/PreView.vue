
<template>
  <!-- TODO extract preview card used for page list -->
  <div style="{height:100%}">
    <component
      v-for="(element,index) in elements"
      :key="index"
      :is="element.name"
      :style="element.getStyle({position:'absolute'})"
      v-bind="element.getProps({mode:'preview'})"
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