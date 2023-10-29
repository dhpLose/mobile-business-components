<template>
  <van-popup v-model="show" :class="class_name" :round="round" :closeable="closeable" close-icon="close" :position="position" :style="styleSize" @close="close" @open="open" @opened="opened">
    <slot name="title" :title="title" v-if="slot_title">
      <div class="title">{{ title }}</div>
    </slot>
    <slot>
      <div class="popup-main">
        <div>匿名插槽</div>
      </div>
    </slot>
    <slot name="footer" v-if="slot_footer">
      <div class="footer">
        <van-button v-for="item in button" :key="item.key" :type="item.type" :loading="item.loading" @click="handlerButton(item)">{{ item.label }}</van-button>
      </div>
    </slot>
  </van-popup>
</template>
<script>
export default {
  name: 'popupComponents',
  props: {
    class_name: {
      type: String,
      default: 'm-popup'
    },
    title: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
    },
    position: {
      type: String,
      default: 'bottom'
    },
    round: {
      type: Boolean,
      default: false
    },
    slot_title: {
      type: Boolean,
      default: true
    },
    slot_footer: {
      type: Boolean,
      default: true
    },
    closeable: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      default: false
    },
    button: {
      type: Array,
      default: () => ([
        { key: 'cancel', label: '取消', type: 'primary', loading: false },
        { key: 'submit', label: '确定', type: 'primary', loading: false }
      ])
    },
    beforeSubmit: Function
  },
  data () {
    return {
      show: false,
    }
  },
  computed: {
    styleSize () {
      const height = this.height
      return { height }
    }
  },
  watch: {
    visible: {
      handler (val) {
        this.show = val
      }
    }
  },
  methods: {
    open () {
      this.$emit('callbackOpen')
    },
    opened () {
      this.$emit('callbackOpened')
    },
    close () {
      this.show = false
      this.$emit('update:visible', false)
      this.$emit('callbackClose')
    },
    handlerButton (data) {
      if (data.key === 'submit') {
        this.handleSubmit(data)
        data.callback && data.callback(data)
        return false
      }
      if (data.key === 'cancel') {
        this.handleCancel(data)
        data.callback && data.callback(data)
        return false
      }
    },
    handleSubmit (data) {
      if (typeof this.beforeSubmit === 'function') {
        this.$set(data, 'loading', true)
        this.beforeSubmit().then(() => {
          this.$set(data, 'loading', false)
        }).catch(() => {
          this.$set(data, 'loading', false)
        })
      }
    },
    handleCancel () {
      this.close()
    }
  },
}
</script>
<style lang="scss" scoped>
.m-popup {
  /deep/.van-popup__close-icon--top-right {
    top: 8px;
    right: 9px;
  }
  .title {
    height: 40px;
    line-height: 40px;
    background-color: #f99c34;
    color: white;
    font-size: 15px;
    padding-left: 10px;
    font-weight: 600;
  }
  .popup-main {
    max-height: calc(100vh - 120px);
    overflow-y: scroll;
  }
  .footer {
    margin: 0 0 15px 0;
    padding: 0 20px;
    text-align: right;
    .van-button {
      height: 32px;
      border-radius: 5px;
    }
    .van-button + .van-button {
      margin-left: 10px;
    }
    .van-button--primary {
      border: 0;
      color: #fff;
      background-color: #f99c34;
      padding: 8px 20px;
    }
  }
}
</style>