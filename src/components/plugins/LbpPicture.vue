<template>
  <img :src="this.imgSrc||placeholderImg" width="100%" alt />
</template>

<script>
import placeholderImg from './lbp-picture-placeholder.jpg'
export default {
  name: 'lbp-picture',
  props: {
    imgSrc: {
      type: String,
      default: placeholderImg
    }
  },
  data() {
    return {
      placeholderImg
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