export default [
    {
      path: "/seller",
      component: () =>  import("../views/PublicView.vue"),
      redirect: { name: "profile-seller" },
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
      ],
    },
  ];
  