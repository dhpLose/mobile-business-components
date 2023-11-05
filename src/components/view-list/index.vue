<template>
  <van-pull-refresh v-model="isLoading" :disabled="disablePullRefresh" :pull-distance="pullDistance" :head-height="80" :pulling-text="'下拉即可刷新'" :loosing-text="'释放即可刷新...'" :loading-text="'加载中...'" :success-text="'刷新成功'" @refresh="onRefresh">
    <van-list v-model="isLoadingList" :immediate-check="false" :finished="isFinished" finished-text="没有更多了" @load="onLoad">
      <slot></slot>
    </van-list>
  </van-pull-refresh>
</template>
<script>
import { Notify } from 'vant'
export default {
  name: 'view-list',
  props: {
    format: Function,
    getViewListApi: Function,
    disablePullRefresh: Boolean,
    pullDistance: {
      type: [String, Number],
      default: 50
    },
    viewList: {
      type: Array,
      default: () => ([])
    },
    prams: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      isLoading: false,
      isLoadingList: false,
      isFinished: false,
    }
  },
  mounted () {
    this.getList(this.prams)
  },
  methods: {
    getList (query) {
      if (this.getViewListApi && typeof this.getViewListApi === 'function') {
        this.getViewListApi(query).then(response => {
          let list = []
          let request_data = []
          if (this.format && typeof this.format === 'function') {
            request_data = this.format(response.data)
          } else {
            request_data = response.data.data || []
          }
          this.isFinished = false
          this.isLoadingList = false
          if (this.prams.current === 1) {
            this.$emit('update:viewList', [])
            list = request_data
          } else {
            list = [...this.viewList, ...request_data]
          }
          if (!request_data.length) {
            this.isFinished = true
          }
          this.$emit('update:viewList', list)
        }).catch(() => {
          this.isLoading = false
          this.isLoadingList = false
        })
      } else {
        Notify({ type: 'warning', message: '请正确书写获取数据逻辑' });
      }
    },
    onRefresh () {
      this.isFinished = false
      this.isLoading = false
      this.isLoadingList = true
      this.prams.current = 1
      this.$emit('update:prams', this.prams)
      this.getList(this.prams)
    },
    onLoad () {
      this.prams.current = this.prams.current + 1
      this.getList(this.prams)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>