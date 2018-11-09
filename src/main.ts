import jQuery from "jquery";
(window as any)["jQuery"] = jQuery;
(window as any)["$"] = jQuery;

import "popper.js";
import "bootstrap";

// tslint:disable-next-line:no-var-requires
// require("./template/js/adminlte.js");

import Vue from "vue";
import AppRoot from "./app-root";
import router from "./router";
import "@/register-service-worker";
import Vuebar from "vuebar";

Vue.config.productionTip = false;

Vue.use(Vuebar);

new Vue({
  router,
  render: (h) => h(AppRoot),
}).$mount("#app");
