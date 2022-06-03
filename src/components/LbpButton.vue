<template>
  <button
    :style="{
  color,
  textAlign,
  backgroundColor,
  fontSize:fontSize+'px',
  lineHeight:lineHeight+'em',
  borderColor,
  borderRadius:borderRadius+'px',
  borderWidth:borderWidth+'px',
  textDecoration:'none'
  }"
  >{{name}}</button>
</template>

<script>
export default {
  name: 'lbp-button',
  //   组件的属性
  props: {
    name: {
      type: String,
      default: '按钮'
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: '请填写提示文字'
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    backgroundColor: {
      type: String,
      default: 'transparent'
    },

    color: {
      type: String,
      default: 'black'
    },
    fontSize: {
      type: Number,
      default: 14
    },
    lineHeight: {
      type: Number,
      default: 1
    },
    borderWidth: {
      type: Number,
      default: 1
    },
    borderRadius: {
      type: Number,
      default: 0
    },
    borderColor: {
      type: String,
      default: '#ced4da'
    },
    textAlign: {
      type: String,
      default: 'center'
    }
  },
  //   editor右侧编辑框配置
  //   利用element现有的组件以及自定义组件来实现
  editorConfig: {
    propConfig: {
      name: {
        type: 'el-input',
        label: '按钮文字',
        require: true,
        widgetProps: {
          value: '按钮'
        }
      },
      fontSize: {
        type: 'el-input-number',
        label: '字号(px)',
        require: true,
        prop: {
          step: 1,
          min: 12,
          max: 144
        },
        widgetProps: {
          value: 14
        }
      },
      color: {
        type: 'el-input',
        label: '文字颜色',
        prop: {
          type: 'color'
        },
        require: true,
        widgetProps: {
          value: ''
        }
      },
      backgroundColor: {
        type: 'el-input',
        label: '背景颜色',
        prop: {
          type: 'color'
        },
        require: true,
        widgetProps: {
          value: ''
        }
      },
      borderColor: {
        type: 'el-input',
        label: '边框颜色',
        prop: {
          type: 'color'
        },
        require: true,
        widgetProps: {
          value: '#ced4a'
        }
      },
      borderWidth: {
        type: 'el-input-number',
        label: '边框宽度(px)',
        require: true,
        prop: {
          step: 1,
          min: 1,
          max: 10
        },
        widgetProps: {
          value: 1
        }
      },
      borderRadius: {
        type: 'el-input-number',
        label: '圆角(px)',
        require: true,
        prop: {
          step: 0.1,
          min: 0,
          max: 10
        },
        widgetProps: {
          value: 0
        }
      },
      lineHeight: {
        type: 'el-input-number',
        label: '行高',
        require: true,
        prop: {
          step: 0.1,
          min: 0.1,
          max: 10
        },
        widgetProps: {
          value: 1
        }
      },
      textAlign: {
        type: 'lbs-text-align',
        label: '文字对齐',
        require: true,
        widgetProps: {
          value: 'center'
        }
      }
    },
    components: {
      // 文字对齐标签组件
      'lbs-text-align': {
        template: `
            <div>
                <el-radio-group v-model=""
            </div>
            `,
        props: {
          value: {
            type: [String, Number]
          }
        },
        data() {
          return {
            textAlignTabs: [
              { label: '左对齐', value: 'left' },
              { label: '居中', value: 'center' },
              { label: '右对齐', value: 'right' }
            ]
          }
        },
        computed: {
          value_: {
            get: () => this.value,
            // 双向绑定
            set(val) {
              this.$emit('input', val)
            }
          }
        }
      },
      // 选择框类型组件
      'lbs-select-input-type': {
        props: ['value'],
        computed: {
          value_: {
            get() {
              return this.value
            },
            set(val) {
              this.$emit('input', val)
            }
          }
        },
        template: `
        <el-select v-model="value_" placeholder="类型">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        `,
        data() {
          return {
            options: [
              {
                label: '文字',
                value: 'text'
              },
              {
                label: '密码',
                value: 'password'
              },
              {
                label: '日期',
                value: 'date'
              },
              {
                label: '邮箱',
                value: 'email'
              },
              {
                label: '手机号',
                value: 'tel'
              }
            ]
          }
        }
      }
    }
  }
}
</script>

<style>
</style>