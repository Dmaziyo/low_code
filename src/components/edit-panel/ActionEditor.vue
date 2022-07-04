<template>
  <div>
    <span v-if="!this.editingElement">请先选择一个元素</span>
    <div v-else>TODO</div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState('element', ['editingElement'])
  },
  methods: {
    ...mapActions('element', ['setEditingElement'])
  },
  created() {}
}
</script>

<style>
</style>