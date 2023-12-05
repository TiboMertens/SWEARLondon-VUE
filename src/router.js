import { createRouter, createWebHashHistory } from 'vue-router';
import LoginPage from './components/LoginPage.vue';
import updatePassword from './components/UpdatePassword.vue';

const routes = [
  { path: '/', component: LoginPage},
  { path: '/orders'},
  { path: '/updatePassword', component: updatePassword},
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
