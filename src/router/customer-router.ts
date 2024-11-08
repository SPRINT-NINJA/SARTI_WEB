export default [
    {
        path:"/customer",
        component:()=> import("../modules/orders/views/CustomerOrderListView.vue"),
        redirect: {name: "order-list"},
        name:"customer",
        children:[
            {
                path: "order-list",
                props: true,
                name: "order-list",
                component: () => import("../modules/orders/views/CustomerOrderListView.vue"),
                meta: {
                  title: "Lista de pedidos",
                  requireAuth: false,
                },
            }
        ]
    }
]