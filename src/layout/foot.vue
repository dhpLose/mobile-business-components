<template>
  <div class="footer">
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="home-o" replace to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="search" replace to="/search">搜索</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" replace to="cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="friends-o" replace to="/mine">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  name: 'footer11',
  data () {
    return {
      active: 0
    }
  }
}
</script>
