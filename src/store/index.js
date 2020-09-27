import Vue from "vue";
import Vuex from "vuex";

import PostStore from "./logicModules/postStore";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    PostStore
  }
});
