<template>
  <div class="layout">
    <div class="layout-main">
      <!-- <layout-main></layout-main> -->
      <router-view />
    </div>
    <div class="layout-footer">
      <layout-footer></layout-footer>
    </div>
  </div>
</template>
<script>
export default {
  name: 'layout',
  components: {
    'layout-main': () => import('./main.vue'),
    'layout-footer': () => import('./foot.vue')
  },
  data () {
    return {
      //
    }
  }
}
</script>
<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .layout-main {
    flex: 1;
    // background: pink;
    opacity: 0.7;
  }
  .layout-footer {
    height: 50px;
  }
}
</style>