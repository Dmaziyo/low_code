<template>
  <!-- 左侧组件列表栏 -->
  <el-tabs tab-position="left" class="lb-tabs">
    <el-tab-pane label="组件列表">
      <div class="full-height">
        <el-button
          class="plugin-item"
          v-for="(item,index) in visiblePluginList"
          :key="index"
          @click="Eclone(item)"
        >
          <i
            :class="['fa',`fa-${item.icon}`]"
            aria-hidden="true"
            style="display:block;font-size:16px;margin-bottom:10px"
          />
          <span>{{item.title}}</span>
        </el-button>
      </div>
    </el-tab-pane>
    <el-tab-pane label="页面管理">
      <span>页面管理</span>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  props: {
    visiblePluginList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    Eclone(item) {
      this.$emit('Eclone', item)
    }
  }
}
</script>

<style lang="scss">
.plugin-item {
  border: 1px solid #f1efef;
  width: 49%;
  padding: 12px 12px;
  &:nth-child(even) {
    margin: 4px 0 4px 2% !important;
  }
}
.lb-tabs {
  box-shadow: none;
  padding: 4px 8px 4px 0;
  border: 1px solid #ebeef5;
  height: 100%;
}
.full-height {
  height: 100% !important;
}
</style>