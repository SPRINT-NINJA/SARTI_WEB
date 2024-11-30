
import Vue from "vue";
import VueRouter from "vue-router";
import publicRouter from "./public-router";
import deliveryRouter from "./delivery-router";
import customerRouter from "./customer-router";
import sellerRouter from "./seller-router";
import {jwtDecode} from 'jwt-decode';
import { ERoles } from "@/kernel/types";

Vue.use(VueRouter);
const DEFAULT_TITLE = "SARTI";


const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/sarti",
    },
    {
      path: "/",
      component: { render: (c: any) => c("router-view") },
      children: [
        {
          path: "/recovery-pass",
          props: true,
          name: "recovery-pass",
          component: () => import("../modules/auth/views/RecoveryPassword.vue"),
          meta: {
            title: "Iniciar sesión",
            requireAuth: false,
          },
        },
        {
          path: "/login",
          props: true,
          name: "login",
          component: () => import("../modules/auth/views/Login.vue"),
          meta: {
            title: "Iniciar sesión",
            requireAuth: false,
          },
        },
        {
          path: "/create-account",
          props: true,
          name: "CreateAccount",
          component: () => import("../modules/auth/views/CreateAccount.vue"),
          meta: {
            title: "Crear Cuenta",
            requireAuth: false,
          },
        },
        {
          path: "/create-account-seller",
          props: true,
          name: "create-account-seller",
          component: () =>
            import("../modules/auth/views/CreateAccountSeller.vue"),
          meta: {
            title: "Crear cuenta emprendedor",
            requireAuth: false,
          },
        },
        {
          path: "/create-account-customer",
          props: true,
          name: "create-account-customer",
          component: () =>
            import("../modules/auth/views/CreateAccountCustomer.vue"),
          meta: {
            title: "Crear cuenta cliente",
            requireAuth: false,
          },
        },
        {
          path: "/create-account-deliveryMan",
          props: true,
          name: "create-account-deliveryMan",
          component: () =>
            import("../modules/auth/views/CreateAccountDeliveryMan.vue"),
          meta: {
            title: "Crear cuenta cliente",
            requireAuth: false,
          },
        },
        ...publicRouter,
        ...customerRouter,
        ...deliveryRouter,
        ...sellerRouter
      ],
    },
  ],
});



router.beforeEach((to, from, next) => {
  if (localStorage.token) {
    const rl: any = jwtDecode(localStorage.token);
    const roles = rl.role;
    const role = roles[0].authority;
    if (
      (role === ERoles.SELLER &&
        to.matched.some((route) => route.path === "/sarti")) ||
      (role === ERoles.SELLER &&
        to.matched.some((route) => route.path === "/home-page")) ||
      (role === ERoles.SELLER &&
        to.matched.some((route) => route.path === "/login"))
    )
      next("/seller");
    if (
      (role === ERoles.CUSTOMER &&
        to.matched.some((route) => route.path === "/sarti")) ||
      (role === ERoles.CUSTOMER &&
        to.matched.some((route) => route.path === "/home-page")) ||
      (role === ERoles.CUSTOMER &&
        to.matched.some((route) => route.path === "/login"))
    )
      next("/customer");
    if (
      (role === ERoles.DELIVERYMAN &&
        to.matched.some((route) => route.path === "/sarti")) ||
      (role === ERoles.DELIVERYMAN &&
        to.matched.some((route) => route.path === "/login"))
    )
      next("/delivery");
    if (role && to.matched.some((route) => route.meta.requireAuth)) {
      const allowedRoles = to.meta!.role;
      if (allowedRoles.includes(role)) {
        next();
        return;
      }
      next("/login");
      return;
    }
    next();
    return;
  }
  if (!to.matched.some((noAuth) => noAuth.meta.requireAuth)) {
    next();
    return;
  }
  next("/login");
});

router.afterEach((to, from) => {
  Vue.nextTick(() => {
    document.title = to.meta?.title || DEFAULT_TITLE;
  });
});



export default router;
