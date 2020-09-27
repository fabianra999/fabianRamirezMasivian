import Vue from "vue";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import App from "./App";
import router from "./router";
import store from "./store";
import ViewUI from "view-design";

import vuetify from "@/plugins/vuetify";
import VueEditor from "vue2-editor";
import Vue2Filters from "vue2-filters";

Vue.use(ViewUI);
Vue.use(VueEditor);
Vue.use(VueSweetalert2);
Vue.use(Vue2Filters);

Vue.prototype.$restApiToken = false;
Vue.prototype.$urlServices = 'http://localhost:3000'; //https://github.com/akabab/starwars-api
Vue.prototype.$urlServicesPost = 'https://xkcd.com';

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
