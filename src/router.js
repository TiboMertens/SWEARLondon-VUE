import { createRouter, createWebHashHistory } from 'vue-router';
import LoginPage from './pages/LoginPage.vue';
import updatePassword from './pages/UpdatePassword.vue';
import Orders from './pages/OrdersPage.vue';
import Details from './pages/OrderDetailsPage.vue';

const routes = [
  { path: '/', component: LoginPage },
  { path: '/orders', component: Orders },
  { path: '/updatePassword', component: updatePassword },
  { path: '/orders/:id', component: Details }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
