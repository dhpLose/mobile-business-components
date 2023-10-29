import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 引用 自适应
import "amfe-flexible";

// 引用 vant ui
import Vant from "vant";
import "vant/lib/index.css";

Vue.use(Vant);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
