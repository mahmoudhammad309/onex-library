import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignupView from "../views/SignupView.vue";
import LoginView from "../views/LoginView.vue";
import Profile from "../views/ProfileView.vue";
import store from "@/store";
import { userAuth } from "../Api";
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignupView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    meta: {
      isAuthenticated: true,
    },
  },
];

const router = createRouter({
  // eslint-disable-next-line no-undef
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.isAuthenticated) {
    try {
      const res = await userAuth.getUser();
      store.state.user = res.data.data;
    } catch (error) {
      next("/login");
    }
    if (store.state.user) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
