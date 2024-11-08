  import Vue from "vue";
  import VueRouter from "vue-router";
  import publicRouter from "./public-router";
  import deliveryRouter from "./delivery-router";

  Vue.use(VueRouter);

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
          // {
          //   path: '/login',
          //   props: true,
          //   name: 'login',
          //   component: () => import('../modules/auth/views/LoginView.vue'),
          //   meta: {
          //     title: 'Iniciar sesión',
          //     requireAuth: false
          //   }
          // },
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
          ...publicRouter,
          ...deliveryRouter,
        ],
      },
    ],
  });

  export default router;
