export default [
  {
    path: "/customer",
    component: () =>  import("../views/PublicView.vue"),
    redirect: { name: "order-list" },
    name: "customer",
    children: [
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
      },
    ],
  },
];
