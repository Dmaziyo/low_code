<template>
  <img :src="this.imgSrc" width="100%" alt />
</template>

<script>
export default {
  name: 'lbp-picture',
  props: {
    imgSrc: {
      type: String,
      default:
        'https://fsa.zobj.net/crop.php?r=3m8AnoH0V-gRt_kV2Ci1hyMThuHt-6DLFdX5vfzEOLGVMYeyedJJ-PhNrS4fDwmxJOBwe4_lzCXuAoXSpXSWADCQmwsgIdcPz9oT9f93yFQaBl3VqD68Zi_3qovwCKGYbpi0lv1UvgXsr8uTk9KsTnyDcH9YQF_s2tuK-Yifp9BK1YMLcYtUPi7KLUvlzGIozx14Po3ZXevFhjvu'
    }
  },
  editorConfig: {
    propConfig: {
      imgSrc: {
        type: 'el-input',
        label: '图片url',
        require: true,
        prop: {
          type: 'textarea'
        },
        defaultPropValue: ''
      }
    },
    components: {
      //'picture-picker':PicturePicker,
    }
  }
}
</script>

<style>
</style>