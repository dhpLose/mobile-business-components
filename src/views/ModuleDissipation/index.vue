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
        <div class="text" @click="handlePopubList">列表数据</div>
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
    <!-- view-list -->
    <m-popup :title="popupListConfig.title" :visible.sync="popupListConfig.visible" :slot_footer="false" height="100%">
      <div class="list-container">
        <div class="container">
          <m-view-list :prams.sync="request" :viewList.sync="viewList" :get-view-list-api="getViewListApi" :format="handleFormat">
            <van-card v-for="item in viewList" :key="item.id" num="2" price="2.00" :desc="item.createdAt" :title="item.messageName" :thumb="item.url" />
          </m-view-list>
        </div>
      </div>
    </m-popup>
  </div>
</template>
<script>
export default {
  name: 'ModuleDissipation',
  components: {
    'm-dialog': () => import('@/components/dialog'),
    'm-popup': () => import('@/components/popup'),
    'm-view-list': () => import('@/components/view-list')
  },
  data () {
    return {
      dialogConfig: {
        visible: false
      },
      popupConfig: {
        title: '靓仔',
        visible: false
      },
      // list-view
      popupListConfig: {
        title: '列表数据',
        visible: false
      },
      request: {
        current: 1,
        size: 10,
        total: 100,
        pages: 100,
      },
      dbList: [],
      viewList: [],
    }
  },
  mounted () {
    this.initListViewData()
  },
  methods: {
    handleDialog () {
      this.dialogConfig.visible = true
    },
    handlePopup () {
      this.popupConfig.visible = true
    },
    // list-view
    handlePopubList () {
      this.popupListConfig.visible = true
    },
    sleep (time) {
      return new Promise(resolve => setTimeout(resolve, time))
    },
    initListViewData () {
      let count = this.request.pages
      for (let i = 0; i < count; i++) {
        this.dbList.push({
          id: i + 1,
          messageName: '长图片' + i,
          createdAt: '2021-07-27 17:06:19',
          createdByDeptName: '百色',
          url: 'http://vue.tuokecat.com/cdn/h5/newslist.jpg'
        })
      }
    },
    handleFormat (data) { // 处理数据
      return data.data
    },
    async getViewListApi (query) { // 接口处理
      let { current, size, total } = query
      let start = (current - 1) * size
      let end = current * size
      let tempList = this.dbList.slice(start, end)
      let result = {
        code: 1,
        message: '请求成功',
        data: {
          data: tempList,
          current: current,
          size: size,
          total: total
        }
      }
      await this.sleep(500)
      return new Promise(resolve => resolve(result))
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
// view-list
.list-container {
  height: calc(100vh - 40px);
  display: flex;
  flex-direction: column;
  .container {
    flex: 1;
    overflow-y: scroll;
  }
}
</style>