export default  [
    {
        path: "/sarti",
        component: () => import('../views/PublicView.vue'),
        redirect: { name: "home-page-view"},
        name: "sarti",
        children: [
            {
                path: "home-page-view",
                name: "home-page-view",
                component: () => import('../modules/public/views/HomePageView.vue'),
                meta: {
                    title: "Inicio",
                    requireAuth: false,
                },
            },
        ]
    }
]