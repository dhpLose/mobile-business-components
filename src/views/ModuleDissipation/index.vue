<template>
  <div class="function">
    <van-row gutter="20" class="function-type">
      <van-col span="8" @click="handleDialog">
        <div class="text">dialog</div>
      </van-col>
      <van-col span="8">
        <div class="text" @click="handlePopup">popup</div>
      </van-col>
      <van-col span="8">
        <div class="text">表格</div>
      </van-col>
    </van-row>
    <!-- dialog -->
    <m-dialog title="dialog弹窗" :visible.sync="dialogConfig.visible">
      <div class="dialog-main">
        <div class="search" style="height: 50px">搜索</div>
        <div class="main" style="height: 700px">main</div>
      </div>
    </m-dialog>
    <!-- popup -->
    <m-popup :title="popupConfig.title" :visible.sync="popupConfig.visible" round></m-popup>
  </div>
</template>
<script>
export default {
  name: 'ModuleDissipation',
  components: {
    'm-dialog': () => import('@/components/dialog'),
    'm-popup': () => import('@/components/popup')
  },
  data () {
    return {
      dialogConfig: {
        visible: false
      },
      popupConfig: {
        title: '靓仔',
        visible: false
      }
    }
  },
  methods: {
    handleDialog () {
      this.dialogConfig.visible = true
    },
    handlePopup () {
      this.popupConfig.visible = true
    }
  }
}
</script>
<style lang="scss" scoped>
.function {
  .function-type {
    .van-col {
      text-align: center;
      .text {
        background: #39a9ed;
      }
    }
  }
}
.dialog-main {
  max-height: calc(100vh - 110px);
  overflow-y: scroll;
}
</style>