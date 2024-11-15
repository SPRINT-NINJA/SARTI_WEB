export default [
  {
    path: "/seller",
    component: () => import("../views/SellerView.vue"),
    redirect: { name: "rate-list" }, //TODO cambiar por la que corresponda
    name: "seller",
    children: [
        {
            path: "rate-list",
            name: "rate-list",
            component: () => import("../modules/rates/views/RatesListView.vue"),
            meta: {
                title: "Lista de reseñas",
                requireAuth: false,
            },
        }
    ],
  },
];
