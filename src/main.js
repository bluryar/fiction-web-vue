import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Storage from "vue-ls";

import MainContainer from "./components/MainContainer.vue";
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";
import "./plugins/element.js";
import "./assets/css/element-variables.scss";

Vue.config.productionTip = false;

// 注册自定义的全局组件
Vue.component("main-container", MainContainer);
Vue.component("my-footer", Footer);
Vue.component("my-header", Header);

Vue.use(Storage, {
  namespace: "talchs-local__", // key prefix
  name: "ls" // name variable Vue.[ls] or this.[$ls],
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
