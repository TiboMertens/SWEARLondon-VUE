import { createRouter, createWebHashHistory } from 'vue-router';
import LoginPage from './components/LoginPage.vue';
import updatePassword from './components/UpdatePassword.vue';
import Orders from './components/OrdersPage.vue';
import Details from './components/OrderDetailsPage.vue';

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
