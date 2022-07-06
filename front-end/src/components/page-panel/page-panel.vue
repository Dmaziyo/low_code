<template>
  <div>
    <!-- 遍历pages动态生成页面管理item -->
    <span
      v-for="(item,index) in pages"
      :key="'__page'+index"
      :style="{display:'flex',justifyContent:'space-between',padding:'12px 0'}"
    >
      <span>第{{index+1}}页</span>
      <a-dropdown :trigger="['hover']" placement="bottomCenter">
        <a href="#" class="ant-dropdown-link">
          <a-icon type="down" />
        </a>
        <a-menu slot="overlay" @click="({key})=>pageManager({type:key})">
          <a-menu-item key="add">
            <a-icon type="user" />新增页面
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </span>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('editor', {
      pages: state => state.work.pages
    })
  },
  methods: {
    ...mapActions('editor', ['pageManager'])
  }
}
</script>

<style>
</style>