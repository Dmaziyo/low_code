<template>
  <!-- Canvas -->
  <div
    class="canvas-editor-wrapper"
    @click="this.handleClickCanvasProp"
    style="{position:relative height:100%}"
  >
    <Shape
      v-for="(element,index) in elements"
      :key="index"
      :element="element"
      :editingElement="editingElement"
      :active="editingElement===element"
      :handleMousedownProp="handleClickElementProp.bind(this,element)"
    >
      <component
        class="element-on-edit-canvas"
        :is="element.name"
        :style="element.getStyle()"
        v-bind="element.pluginProps"
      ></component>
    </Shape>
  </div>
</template>

<script>
import Shape from '@/components/core/support/Shape.vue'
export default {
  components: {
    Shape
  },
  data: () => ({
    parentD: {}
  }),
  props: {
    elements: {
      type: Array,
      default: () => []
    },
    handleClickElementProp: {
      type: Function
    },
    editingElement: {
      type: Object,
      default: () => {}
    },
    handleClickCanvasProp: {
      type: Function
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