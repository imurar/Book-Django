import { createRouter, createWebHistory } from "vue-router";
import BookCreate from "../components/BookCreate.vue";
import BookList from "../components/BookList.vue";

const routes = [
  { path: "/", name: "BookList", component: BookList },
  { path: "/create", name: "BookCreate", component: BookCreate },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
