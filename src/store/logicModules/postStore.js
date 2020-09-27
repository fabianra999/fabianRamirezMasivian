import Vue from "vue";
import restApi from "@/store/utils/restApi.js";

const getters = {};
const actions = {
  getPostsList({ commit }) {
    let url = Vue.prototype.$urlServices + "/posts?state=true";
    restApi
      .get(url)
      .then(response => {
        if (response.statusText) {
          const list = response.data;
          commit("setPostsList", list);
        }
      })
      .catch(err => {
        console.log(err);
      });
  },

  getCharacter({ commit, state }, data) {
    let url = Vue.prototype.$urlServices + `/posts/${data.numberRandom}`;
    restApi
      .get(url)
      .then(response => {
        if (response.statusText) {
          commit("setNewCharacter", response.data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  },

  putCharacter({ commit, state }, data) {
    let newData = data;
    newData.data.state = true;
    let url = Vue.prototype.$urlServices + `/posts/${newData.data.id}`;
    restApi
      .put(url, newData.data)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  },

  getPost({ commit, state }, data) {
    var axios = require("axios");

    var config = {
      method: "get",
      url: "https://xkcd.com/614/info.0.json",
      headers: {}
    };

    axios(config)
      .then(function(response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};

const mutations = {
  setPostsList(state, response) {
    state.postStore = response;
  },
  setPost(state, response) {
    state.newPost = response;
  },
  setNewCharacter(state, response) {
    state.newCharacter = response;
  }
};

export default {
  namespaced: true,
  state() {
    return {
      postStore: [],
      newPost: [],
      newCharacter: {}
    };
  },
  getters,
  actions,
  mutations
};
