const allowedRoles = ["COMPRADOR"];
export default [
  {
    path: "/customer",
    component: () =>  import("../views/PublicView.vue"),
    redirect: { name: "profile-customer" },
    name: "customer",
    children: [
      {
        path: "profile-customer",
        name: "profile-customer",
        component: () => import("../modules/auth/views/ProfileCustomerView.vue"),
        meta: {
          title: "Perfil",
          requireAuth: true,
          role: allowedRoles,
        },
      },
      {
        path: "order-list-customer",
        name: "order-list-customer",
        component: () => import("../modules/orders/views/CustomerOrderListView.vue"),
        meta: {
          title: "Lista de pedidos",
          requireAuth: true,
          role: allowedRoles,
        },
      },
      {
        path: "order-detail",
        name: "order-detail",
        component: () =>import("../modules/orders/views/CustomerOrderDetailsView.vue"),
        meta: {
          title: "Detalle de pedido",
          requireAuth: true,
          role: allowedRoles,
        },
      },
      {
        path: "create-rate",
        name: "create-rate",
        component: () =>import("../modules/rates/views/CustomerCreateRateView.vue"),
        meta: {
          title: "Creación de reseña",
          requireAuth: true,
          role: allowedRoles,
        },
      },{
        path: "buy-order",
        props: true,
        name: "buy-order",
        component: () => import("../modules/orders/views/CustomerBuyOrderView.vue"),
        meta: {
          title: "Creación de reseña",
          requireAuth: true,
          role: allowedRoles,
        },
      },
    ],
  },
];
