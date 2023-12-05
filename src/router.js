import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  { path: '/'},
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
