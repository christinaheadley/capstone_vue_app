import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import Signup from "../views/Signup.vue";
import PostsNew from "../views/PostsNew.vue";
import PostsShow from "../views/PostsShow.vue";
import PostsEdit from "../views/PostsEdit.vue";
import UsersShow from "../views/UsersShow.vue";
import UsersEdit from "../views/UsersEdit.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/#",
    redirect: "/",
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/posts/new",
    name: "posts-new",
    component: PostsNew,
  },
  {
    path: "/posts/:id",
    name: "posts-show",
    component: PostsShow,
  },
  {
    path: "/posts/:id/edit",
    name: "posts-edit",
    component: PostsEdit,
  },
  {
    path: "/users/:id",
    name: "users-show",
    component: UsersShow,
  },
  {
    path: "/users/:id/edit",
    name: "users-edit",
    component: UsersEdit,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return {
        selector: to.hash,
      };
    }
  },
});

export default router;
