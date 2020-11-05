import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/search",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "search" */ "../views/Search.vue")
  },
  {
    path: "/bookshelf",
    name: "Bookshelf",
    component: () =>
      import(/* webpackChunkName: "bookshelf" */ "../views/Bookshelf.vue")
  },
  {
    path: "/ranklist",
    name: "Ranklist",
    component: () =>
      import(/* webpackChunkName: "ranklist" */ "../views/Ranklist.vue")
  },
  {
    path: "/book/:book_id",
    name: "Summary",
    component: () =>
      import(/* webpackChunkName: "book_content" */ "../views/book/Summary.vue")
  },
  {
    path: "/catalogs/:book_id",
    name: "Catalogs",
    component: () =>
      import(
        /* webpackChunkName: "book_content" */ "../views/book/Catalogs.vue"
      )
  },
  {
    path: "/book/:book_id/:chapter_index",
    name: "Content",
    component: () =>
      import(/* webpackChunkName: "book_content" */ "../views/book/Content.vue")
  },
  {
    path: "*",
    redirect: "/"
  }
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
