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
      },{
        path: "seller-list",
        name: "seller-list",
        component: () => import("../modules/public/views/SellerListView.vue"),
        meta: {
          title: "Detalles de producto",
          requireAuth: false,
        },
      },{
        path: "seller-products/:id",
        name: "seller-products",
        component: () => import("../modules/public/views/ProductBySellerView.vue"),
        meta: {
          title: "Detalles de producto por emprendedor",
          requireAuth: false,
        },
      },{
        path: "top-rated",
        name: "top-rated",
        component: () => import("../modules/public/views/ProductTopRatedView.vue"),
        meta: {
          title: "Mejores Calificados",
          requireAuth: false,
        }
    }
    ],
  },
];
