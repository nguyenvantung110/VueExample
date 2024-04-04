import Home from './components/modules/home.vue';
import toppage from './components/modules/toppage.vue';
import Login from './components/modules/login.vue';
import { createRouter, createWebHistory } from 'vue-router/dist/vue-router.esm-bundler';
import MainLayout from './components/layouts/main-layout.vue'

const routes = [
  { path: '/login', component: Login },
  {
    path : '/',
    component : MainLayout,
    children : [
        {
            path : '',
            component : Home,
        },
        {
            path : 'toppage',
            component : toppage
        }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Call beforeEach on the router instance
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (to.path !== '/login' && !isLoggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;