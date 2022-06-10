<template>
  <button :style="_style">{{text}}</button>
</template>

<script>
export default {
  name: 'lbp-button',
  //   组件的属性
  props: {
    text: {
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
  computed: {
    _style() {
      return {
        // fix can't change fontSize without getStyle()
        color: this.color,
        textAlign: this.textAlign,
        backgroundColor: this.backgroundColor,
        fontSize: this.fontSize + 'px',
        lineHeight: this.lineHeight + 'em',
        borderColor: this.borderColor,
        borderRadius: this.borderRadius + 'px',
        borderWidth: this.borderWidth + 'px',
        textDecoration: 'none'
      }
    }
  },
  //   editor右侧编辑框配置
  //   利用element现有的组件以及自定义组件来实现
  editorConfig: {
    propConfig: {
      text: {
        type: 'a-input',
        label: '按钮文字',
        require: true,
        defaultPropValue: '按钮'
      },
      fontSize: {
        type: 'a-input-number',
        label: '字号(px)',
        require: true,
        prop: {
          step: 1,
          min: 12,
          max: 144
        },
        defaultPropValue: 14
      },
      color: {
        type: 'a-input',
        label: '文字颜色',
        prop: {
          type: 'color'
        },
        require: true,
        defaultPropValue: 'black'
      },
      backgroundColor: {
        type: 'a-input',
        label: '背景颜色',
        prop: {
          type: 'color'
        },
        require: true,
        defaultPropValue: '#ffffff'
      },
      borderColor: {
        type: 'a-input',
        label: '边框颜色',
        prop: {
          type: 'color'
        },
        require: true,
        defaultPropValue: '#eeeeee'
      },
      borderWidth: {
        type: 'a-input-number',
        label: '边框宽度(px)',
        require: true,
        prop: {
          step: 1,
          min: 1,
          max: 10
        },
        defaultPropValue: 1
      },
      borderRadius: {
        type: 'a-input-number',
        label: '圆角(px)',
        require: true,
        prop: {
          step: 0.1,
          min: 0,
          max: 10
        },
        defaultPropValue: 0
      },
      lineHeight: {
        type: 'a-input-number',
        label: '行高',
        require: true,
        prop: {
          step: 0.1,
          min: 0.1,
          max: 10
        },
        defaultPropValue: 1
      },
      textAlign: {
        type: 'lbs-text-align',
        label: '文字对齐',
        require: true,
        defaultPropValue: 'center'
      }
    },
    components: {
      // 文字对齐标签组件
      'lbs-text-align': {
        template: `
            <div>
                <a-radio-group v-model="value_" size="small">
                  <a-tooltip  placement="top" effect="dark" v-for="(item,index) in textAlignTabs" :key=index :title="item.label">
                    <a-radio-button :label="item.value">
                        <i :class="['fa','fa-align-'+item.value]" aria-hidden="true"></i>
                    </a-radio-button>
                  </a-tooltip>
                </a-radio-group>
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
            get() {
              return this.value
            },
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
        <a-select v-model="value_" placeholder="类型">
            <a-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </a-option>
        </a-select>
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