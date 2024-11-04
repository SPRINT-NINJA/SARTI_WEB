import Vue from "vue";
import VueRouter from "vue-router";
import publicRouter from "./public-router";

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
        },{
          path: "/cart-customer-list",
          props: true,
          name: "cart-customer-list",
          component: () => import("../modules/carts/views/CartCustomerProductListView.vue"),
          meta: {
            title: "Carrito",
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
          component: () => import("../modules/auth/views/CreateAccountSeller.vue"),
          meta: {
            title: "Crear cuenta emprendedor",
            requireAuth: false,
          },
        },{
          path: "/create-account-customer",
          props: true,
          name: "create-account-customer",
          component: () => import("../modules/auth/views/CreateAccountCustomer.vue"),
          meta: {
            title: "Crear cuenta cliente",
            requireAuth: false,
          },
        },{
          path: "/create-account-delivery_man",
          props: true,
          name: "create-account-delivery_man",
          component: () => import("../modules/auth/views/CreateAccountDelivery_Man.vue"),
          meta: {
            title: "Crear cuenta cliente",
            requireAuth: false,
          },
        },{
          path: "/customer-order-list",
          props: true,
          name: "customer-order-list",
          component: () => import("../modules/orders/views/CustomerOrderListView.vue"),
          meta: {
            title: "Lista de pedidos",
            requireAuth: false,
          },
        },{
          path: "/customer-order-detail",
          props: true,
          name: "customer-order-detail",
          component: () => import("../modules/orders/views/CustomerOrderDetailsView.vue"),
          meta: {
            title: "Detalle de pedido",
            requireAuth: false,
          },
        },{
          path: "/customer-create-rate",
          props: true,
          name: "customer-create-rate",
          component: () => import("../modules/rates/views/CustomerCreateRateView.vue"),
          meta: {
            title: "Creación de reseña",
            requireAuth: false,
          },
        },
        ...publicRouter,
      ],
    },
  ],
});

export default router;
