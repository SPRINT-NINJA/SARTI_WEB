export default [
    {
        path: "/delivery",
        component: () =>  import("../views/PublicView.vue"),
        redirect: { name: "profile-delivery" },
        name: "delivery",
        children: [
            {
                path: "profile-delivery",
                name: "profile-delivery",
                component: () => import("../modules/auth/views/ProfileDeliveryManView.vue"),
                meta: {
                    title: "Perfil Repartidor",
                    requireAuth: true,
                },
            },
            {
                path: "order-list-delivery",
                name: "order-list-delivery",
                component: () => import("../modules/delivery/views/OrderList.vue"),
                meta: {
                    title: "Lista de Pedidos",
                    requireAuth: true,
                },
            },
            {
                path: "order-assigned",
                name: "order-assigned",
                component: () => import("../modules/delivery/views/OrderAssigned.vue"),
                meta: {
                    title: "Pedido Asignado",
                    requireAuth: true,
                },
            },
        ],
    },
];
