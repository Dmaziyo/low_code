<script>
export default {
  render(h) {
    const self = this
    const { color, textAlign, fontSize, lineHeight, borderColor } = this

    const style = {
      color,
      textAlign,
      backgroundColor: 'transparent',
      fontSize: fontSize + 'px',
      lineHeight: lineHeight + 'em',
      borderColor,
      textDecoration: 'none'
    }
    return h(
      'div',
      {
        style,
        on: {
          dblclick() {
            console.log('dbClick')
            self.canEdit = true
          }
        }
      },
      [
        h('div', {
          ref: 'editableText',
          style: {
            height: '100%'
          },
          domProps: {
            innerHTML: self.innerText,
            contentEditable: self.canEdit
          },
          on: {
            blur() {
              self.canEdit = false
            },
            input() {
              self.$emit('input', {
                value: self.$refs.editableText.innerHTML,
                pluginName: 'lbp-text'
              })
            }
          }
        })
      ]
    )
  },
  name: 'lbp-text',
  data() {
    return {
      canEdit: false,
      innerText: this.text || '双击修改文字'
    }
  },
  props: {
    text: {
      type: String,
      default: '双击修改文字'
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
    borderStyle: {
      type: String,
      default: 'solid'
    },
    textAlign: {
      type: String,
      default: 'center'
    }
  },
  editorConfig: {
    propConfig: {
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
        defaultPropValue: '#333333'
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
      borderStyle: {
        type: 'a-input',
        label: '边框形式',
        require: true,
        defaultPropValue: 'solid'
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
      'lbs-text-align': {
        template: `
                <div class="wrap">
                    <a-radio-group v-model="value_" size="small">
                        <a-tooltip effect="dark" :content="item.label" placement="top" v-for="(item,index) in textAlignTabs" :key="index">
                            <a-radio-button :label="item.value">
                                <i :class="['fa','fa-align-'+item.value]" aria-hidden="true"
                            </a-radio-button>
                        </a-tooltip> 
                    </a-radio-group>
                </div>`,
        props: {
          value: {
            type: [String, Number]
          }
        },
        data: () => ({
          textAlignTabs: [
            {
              label: '左对齐',
              value: 'left'
            },
            {
              label: '居中对齐',
              value: 'center'
            },
            {
              label: '右对齐',
              value: 'right'
            }
          ]
        }),
        computed: {
          value_: {
            get() {
              return this.value
            },
            set(val) {
              this.$emit('input', val)
            }
          }
        }
      },
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
            <a-option v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </a-option>
        </a-select>
        `,
        data: () => ({
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
        })
      }
    }
  }
}
</script>

<style>
</style>