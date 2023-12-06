import { createRouter, createWebHashHistory } from 'vue-router';
import LoginPage from './components/LoginPage.vue';
import updatePassword from './components/UpdatePassword.vue';
import Orders from './components/OrdersPage.vue';

const routes = [
  { path: '/', component: LoginPage},
  { path: '/orders', component: Orders},
  { path: '/updatePassword', component: updatePassword},
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
