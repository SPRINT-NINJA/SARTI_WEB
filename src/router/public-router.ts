export default [
  {
    path: "/sarti",
    component: () => import("../views/PublicView.vue"),
    redirect: { name: "home-page" },
    name: "sarti",
    children: [
      {
        path: "home-page",
        name: "home-page",
        component: () => import("../modules/public/views/HomePageView.vue"),
        meta: {
          title: "Inicio",
          requireAuth: false,
        },
      },
      {
        path: "product-details/:id",
        name: "product-details",
        component: () => import("../modules/public/views/ProductDetailsView.vue"),
        meta: {
          title: "Detalles de producto",
          requireAuth: false,
        },
      },
    ],
  },
];
