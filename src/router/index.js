import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/views/Home";
import Posts from "@/views/Posts";

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BABEL_ENV,
  routes: [
    {
      path: "/",
      name: "HelloWorld",
      component: HelloWorld
    },
    {
      path: "/home",
      name: "HelloWorld",
      component: HelloWorld
    },
    {
      path: "/posts",
      name: "Posts",
      //component: Posts,
      component:() => import('../views/Posts.vue')
    }
  ]
});
