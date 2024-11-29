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
        path: "rate-list",
        name: "rate-list",
        component: () => import("../modules/rates/views/RatesListView.vue"),
        meta: {
          title: "Lista de reseñas",
          requireAuth: true,
          role: allowedRoles,
        },
      },
    ],
  },
];
