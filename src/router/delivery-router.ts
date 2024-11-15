export default [
    {
        path: "/delivery",
        component: () =>  import("../views/PublicView.vue"),
        redirect: { name: "profile" },
        name: "seller",
        children: [
            {
                path: "profile",
                name: "profile",
                component: () => import("../modules/auth/views/ProfileDeliveryManView.vue"),
                meta: {
                    title: "Perfil Repartidor",
                    requireAuth: true,
                },
            },
            {
                path: "order-list",
                name: "order-list",
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
