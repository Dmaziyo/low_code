import Vue from 'vue'
import LbpButton from '@/components/plugins/LbpButton.vue'
import LbpPicture from '@/components/plugins/LbpPicture.vue'
import LbpText from '@/components/plugins/LbpText.vue'
import LbpFormInput from '@/components/plugins/LbpFormInput.vue'

const pluginsList = [
  {
    title: '图片',
    icon: 'photo',
    component: LbpPicture,
    visible: true,
    name: LbpPicture.name
  },
  {
    title: '文字',
    icon: 'font',
    component: LbpText,
    visible: true,
    name: LbpText.name
  },
  {
    title: '按钮',
    icon: 'hand-pointer-o',
    component: LbpButton,
    visible: true,
    name: LbpButton.name
  },
  {
    title: '表单输入',
    icon: 'pencil-square-o',
    component: LbpFormInput,
    name: LbpFormInput.name
  }
]

export default {
  data: () => ({ pluginsList }),
  methods: {
    mixinPlugins2Editor() {
      pluginsList.forEach(plugin => {
        Vue.component(plugin.name, plugin.component)
      })
    }
  },
  created() {
    this.mixinPlugins2Editor()
  }
}
