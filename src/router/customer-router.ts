export default [
  {
    path: "/customer",
    component: () =>  import("../views/PublicView.vue"),
    redirect: { name: "profile" },
    name: "customer",
    children: [
      {
        path: "profile",
        name: "profile",
        component: () => import("../modules/auth/views/ProfileCustomerView.vue"),
        meta: {
          title: "Perfil",
          requireAuth: false,
        },
      },
      {
        path: "order-list",
        name: "order-list",
        component: () => import("../modules/orders/views/CustomerOrderListView.vue"),
        meta: {
          title: "Lista de pedidos",
          requireAuth: false,
        },
      },
      {
        path: "order-detail",
        name: "order-detail",
        component: () =>import("../modules/orders/views/CustomerOrderDetailsView.vue"),
        meta: {
          title: "Detalle de pedido",
          requireAuth: false,
        },
      },
      {
        path: "create-rate",
        name: "create-rate",
        component: () =>import("../modules/rates/views/CustomerCreateRateView.vue"),
        meta: {
          title: "Creación de reseña",
          requireAuth: false,
        },
      },{
        path: "buy-order",
        props: true,
        name: "buy-order",
        component: () => import("../modules/orders/views/CustomerBuyOrderView.vue"),
        meta: {
          title: "Creación de reseña",
          requireAuth: false,
        },
      },
    ],
  },
];
