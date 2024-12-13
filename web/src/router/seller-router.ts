const allowedRoles = ["EMPRENDEDOR"];

export default [
  {
    path: "/seller",
    component: () => import("../views/PublicView.vue"),
    redirect: { name: "profile-seller" },
    name: "seller",
    children: [
      {
        path: "profile-seller",
        name: "profile-seller",
        component: () => import("../modules/auth/views/ProfileSellerView.vue"),
        meta: {
          title: "Perfil de emprendedor",
          requireAuth: true,
          role: allowedRoles,
        },
      },
      {
        path: "rate-list/:id",
        name: "rate-list",
        component: () => import("../modules/rates/views/RatesListView.vue"),
        meta: {
          title: "Lista de reseñas",
          requireAuth: true,
          role: allowedRoles,
        },
      },
      {
        path: "create-product",
        name: "create-product",
        component: () =>
          import("../modules/products/view/ProductCreateView.vue"),
        meta: {
          title: "Lista de reseñas",
          requireAuth: true,
          role: allowedRoles,
        },
      },
      {
        path: "update-product/:id",
        name: "update-product",
        component: () => import("../modules/products/view/ProductEditView.vue"),
        meta: {
          title: "Lista de reseñas",
          requireAuth: true,
          role: allowedRoles,
        },
      },
      {
        path: "detail-product-seller/:id",
        name: "detail-product-seller",
        component: () =>
          import("../modules/products/view/ProductDetailView.vue"),
        meta: {
          title: "Lista de reseñas",
          requireAuth: true,
          role: allowedRoles,
        },
      },
      {
        path: "product-list",
        name: "product-list",
        component: () => import("../modules/products/view/ProductListView.vue"),
        meta: {
          title: "Lista de productos",
          requireAuth: true,
          role: allowedRoles,
        },
      },
      {
        path: "seller-order-list",
        name: "seller-order-list",
        component: () => import("@/modules/orders/views/SellerOrderList.vue"),
        meta: {
          title: "Lista de pedidos",
          requireAuth: true,
          role: allowedRoles,
        },
      },
      {
        path: "seller-order-details/:id",
        name: "seller-order-details",
        component: () => import("../modules/orders/views/SellerOrderDetails.vue"),
        meta: {
          title: "Lista de reseñas",
          requireAuth: true,
          role: allowedRoles,
        },
      },
    ],
  },
];
