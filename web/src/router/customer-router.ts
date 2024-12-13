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
        path: "order-detail/:id",
        name: "order-detail",
        component: () =>import("../modules/orders/views/CustomerOrderDetailsView.vue"),
        meta: {
          title: "Detalle de pedido",
          requireAuth: true,
          role: allowedRoles,
        },
      },
      {
        path: "create-rate/:id",
        name: "create-rate",
        component: () =>import("../modules/rates/views/CustomerCreateRateView.vue"),
        meta: {
          title: "Creación de reseña",
          requireAuth: true,
          role: allowedRoles,
        },
      },{
        path: "buy-order/:id",
        props: true,
        name: "buy-order",
        component: () => import("../modules/orders/views/CustomerBuyOrderView.vue"),
        meta: {
          title: "Creación de reseña",
          requireAuth: true,
          role: allowedRoles,
        },
      }, {
        path: "cart",
        name: "carts",
        component: () =>
          import("../modules/carts/views/CartCustomerProductListView.vue"),
        meta: {
          title: "Carrito",
          requireAuth: false,
        },
      },{
        path: "order-without-rate",
        name: "order-without-rate",
        component: () =>
          import("../modules/orders/views/CustomerOrderWithoutRateList.vue"),
        meta: {
          title: "Carrito",
          requireAuth: false,
        },
      }
    ],
  },
];
