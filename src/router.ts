import { createRouter, createWebHistory, useRouter } from "vue-router";
import { getCookie } from "@/utils/cookies";

import { routes as routesCategories } from "@/pages/categories/routes";

import Login from "@/pages/auth/login/login.vue";
import Dashboard from "@/pages/dashboard/dashboard.vue";
import Configs from "@/pages/configs/configs.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
      meta: { safe: false },
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
      meta: { safe: true },
    },
    ...routesCategories,
    {
      path: "/configs",
      name: "configs",
      component: Configs,
      meta: { safe: true },
    },
  ],
});

router.beforeEach((to: any) => {
  const router = useRouter();
  const safeRoute = to.matched.some((record: any) => record.meta.safe);
  const isAuth = getCookie("_") && getCookie("_").split(".").length === 3;

  if (safeRoute && !isAuth) router.push({ name: "login" });
});

export default router;
