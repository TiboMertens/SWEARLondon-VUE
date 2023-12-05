import { createRouter, createWebHashHistory } from 'vue-router';
import LoginPage from './components/LoginPage.vue';

const routes = [
  { path: '/', component: LoginPage},
  { path: '/orders'},
  { path: '/updatePassword'},
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
