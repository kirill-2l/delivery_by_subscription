import { createRouter, createWebHistory } from 'vue-router';
import { AppRoutes, getHomeRoute, getLoginPage } from '@/shared/const/routes';
import { useUserStore } from '@/stores/user/user.store';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: getLoginPage(),
      name: AppRoutes.LOGIN,
      component: () => import('@/views/AuthView.vue'),
    },
    {
      path: getHomeRoute(),
      name: AppRoutes.HOME,
      component: () => import('@/views/HomeView.vue'),
    },
  ],
});

router.beforeEach((to, from) => {
  const { isLoggedIn } = useUserStore();
  console.log(isLoggedIn);
  if (!isLoggedIn) {
    return { name: AppRoutes.LOGIN };
  }
});

export default router;
