

<script>
import CoreEditor from '@/components/core/CoreEditor.vue'
import loadPluginMixin from '@/mixins/load-plugins.js'

export default {
  extends: CoreEditor,
  mixins: [loadPluginMixin]
}
</script>

<style lang="scss">
$cellSize: 35.6px;
$designerWidth: 320px;
$designerHeight: 568px;

// 为了能够调用el-col类
#designer-page {
  display: flex;
  min-height: calc(100% - 40px);
}
.canvas-wrapper {
  position: relative;
  top: 5%;
  width: $designerWidth;
  height: $designerHeight;
  border: 1px #ebeaea solid;
  margin: 0 auto;
  background: #fff;
}
</style>