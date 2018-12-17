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
import ContentContainer from "./components/core/content-wrapper/content-container/content-container";
import SidebarPalette from "./views/view-designer/sidebar-palette/sidebar-palette";
import ContentWrapper from "./components/core/content-wrapper/content-wrapper";
import GridRow from "./components/core/grid/grid-row";
import GridCol from "./components/core/grid/grid-col";
import InputText from "./components/forms/input-text/input-text";
import TabControl from "./components/ui-elements/tab-control/tab-control";
import GlobalEvents from "vue-global-events";

Vue.config.productionTip = false;

Vue.use(Vuebar);
Vue.component("content-container", ContentContainer);
Vue.component("sidebar-palette", SidebarPalette);
Vue.component("content-wrapper", ContentWrapper);
Vue.component("grid-row", GridRow);
Vue.component("grid-col", GridCol);
Vue.component("input-text", InputText);
Vue.component("tab-control", TabControl);
Vue.component(GlobalEvents);

new Vue({
  router,
  render: (h) => h(AppRoot),
}).$mount("#app");
