import { createApp } from "vue";
import App from "./App.vue";

import { createRouter, createWebHistory } from "vue-router";
import ImageGallery from "./components/Image.vue";
import Todo from "./components/Todo.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/todo", component: Todo },
    { path: "/image-gallery", component: ImageGallery },
  ],
});

createApp(App).use(router).mount("#app");
