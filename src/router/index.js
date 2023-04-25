import { createRouter, createWebHashHistory } from "vue-router";
import store from "@/store";
// import AccountPage from "@/views/AccountPage";

const routes = [
  {
    name: "HomePage",
    path: "/",
    component: () => import("@/views/HomePage"),
  },
  {
    name: "LoginPage",
    path: "/login",
    component: () => import("@/views/LoginPage"),
  },
  {
    name: "RegisterPage",
    path: "/register",
    component: () => import("@/views/RegisterPage"),
  },
  {
    name: "NewBookmarkPage",
    path: "/new",
    component: () => import("@/views/NewBookmarkPage"),
  },
  {
    name: "FavoritesPage",
    path: "/favorites",
    meta: {
      componentName: "appBookmarkList",
    },
    component: () => import("@/views/AccountPage"),
  },
  {
    name: "LikesPage",
    path: "/likes",
    meta: {
      componentName: "appBookmarkList",
    },
    component: () => import("@/views/AccountPage"),
  },
  {
    name: "SettingsPage",
    path: "/settings",
    meta: {
      componentName: "userSettings",
    },
    component: () => import("@/views/AccountPage"),
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

router.beforeEach((to, from, next) => {
  const authRequiredRoutes = ["HomePage", "NewBookmarkPage"];
  const authNotRequiredRoutes = ["LoginPage", "RegisterPage"];

  const _isAuthenticated = store.getters._isAuthenticated;

  if (authNotRequiredRoutes.indexOf(to.name) > -1 && _isAuthenticated) {
    next(false);
  }

  if (authRequiredRoutes.indexOf(to.name) > -1) {
    if (_isAuthenticated) next();
    else next({ name: "LoginPage" });
  } else {
    next();
  }
});

export default router;
