<template>
  <van-dialog v-model="show" :class="class_name" :closeable="closeable" close-icon="close" width="100%" :showConfirmButton="false" @close="close" @open="open" @opened="opened">
    <slot name="title" :title="title" v-if="slot_title">
      <div class="title">{{ title }}</div>
    </slot>
    <slot>
      <div class="dialog-main">匿名插槽</div>
    </slot>
    <slot name="footer" v-if="slot_footer">
      <div class="footer">
        <van-button v-for="item in button" :key="item.key" :type="item.type" :loading="item.loading" @click="handlerButton(item)">{{ item.label }}</van-button>
      </div>
    </slot>
  </van-dialog>
</template>
<script>
export default {
  name: 'popupComponents',
  props: {
    class_name: {
      type: String,
      default: 'm-dialog'
    },
    title: {
      type: String,
      default: '选择用户'
    },
    visible: Boolean,
    closeable: Boolean,
    slot_title: {
      type: Boolean,
      default: true
    },
    slot_footer: {
      type: Boolean,
      default: true
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
      } else {
        this.close()
      }
    },
    handleCancel () {
      this.close()
    }
  },
}
</script>
<style lang="scss" scoped>
.m-dialog {
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  z-index: 122222222;
  transform: translate(0);
  border-radius: 0;
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
  .dialog-main {
    max-height: calc(100vh - 110px);
    overflow-y: scroll;
  }
  .footer {
    margin: 15px 0;
    padding: 0 20px;
    text-align: right;
    .van-button {
      padding: 0 20px;
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
    }
  }
}
</style>