export default [
    {
        path: "/delivery",
        component: { render: (c: any) => c("router-view") },
        redirect: { name: "order-list" },
        name: "delivery",
        children: [
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
