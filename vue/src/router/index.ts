import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Surveys from "../views/Surveys.vue";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import { useAuthStore } from "../store";
import { storeToRefs } from "pinia";
import AuthLayout from "../layouts/AuthLayout.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/dashboard",
    name: "Dashboard",
    meta: {
      requiresAuth: true,
    },
    component: DefaultLayout,
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "/surveys",
        name: "Surveys",
        component: Surveys,
      },
    ],
  },
  {
    path: "/auth",
    redirect: "/login",
    name: "Auth",
    meta: {
      isGuest: true,
    },
    component: AuthLayout,
    children: [
      {
        path: "/login",
        name: "Login",
        component: Login,
      },
      {
        path: "/register",
        name: "Register",
        component: Register,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  const store = useAuthStore();
  const { auth } = storeToRefs(store);

  if (to.meta.requiresAuth && !auth.value.authenticated) {
    next({ name: "Login" });
  } else if (auth.value.authenticated && to.meta.isGuest) {
    next({ name: "Dashboard" });
  } else {
    next();
  }
});

export default router;
