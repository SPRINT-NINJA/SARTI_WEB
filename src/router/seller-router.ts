export default [
    {
      path: "/seller",
      component: () =>  import("../views/PublicView.vue"),
      redirect: { name: "profile" },
      name: "seller",
      children: [
        {
          path: "profile-seller",
          name: "profile-seller",
          component: () => import("../modules/auth/views/ProfileSellerView.vue"),
          meta: {
            title: "Perfil de emprendedor",
            requireAuth: false,
          },
        },
        {
            path: "rate-list/:id",
            name: "rate-list",
            component: () => import("../modules/rates/views/RatesListView.vue"),
            meta: {
                title: "Lista de reseñas",
                requireAuth: false,
            },
        },
        {
          path: "create-product",
          name: "create-product",
          component: () => import("../modules/products/view/ProductCreateView.vue"),
          meta: {
              title: "Lista de reseñas",
              requireAuth: false,
          },
      },
      {
        path: "update-product/:id",
        name: "update-product",
        component: () => import("../modules/products/view/ProductEditView.vue"),
        meta: {
            title: "Lista de reseñas",
            requireAuth: false,
        },
      },
      {
        path: "detail-product",
        name: "detail-product",
        component: () => import("../modules/products/view/ProductDetailView.vue"),
        meta: {
            title: "Lista de reseñas",
            requireAuth: false,
        },
      }
    ],
  },
];

