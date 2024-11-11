import Vue from "vue";
import VueRouter from "vue-router";
import publicRouter from "./public-router";
import deliveryRouter from "./delivery-router";
import customerRouter from "./customer-router";
import Swal from "sweetalert2";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/sarti",
    },
    {
      path: "/",
      component: { render: (c: any) => c("router-view") },
      children: [
        // {
        //   path: '/login',
        //   props: true,
        //   name: 'login',
        //   component: () => import('../modules/auth/views/LoginView.vue'),
        //   meta: {
        //     title: 'Iniciar sesión',
        //     requireAuth: false
        //   }
        // },
        {
          path: "/recovery-pass",
          props: true,
          name: "recovery-pass",
          component: () => import("../modules/auth/views/RecoveryPassword.vue"),
          meta: {
            title: "Iniciar sesión",
            requireAuth: false,
          },
        },
        {
          path: "/cart-customer-list",
          props: true,
          name: "cart-customer-list",
          component: () =>
            import("../modules/carts/views/CartCustomerProductListView.vue"),
          meta: {
            title: "Carrito",
            requireAuth: false,
          },
        },
        {
          path: "/login",
          props: true,
          name: "login",
          component: () => import("../modules/auth/views/Login.vue"),
          meta: {
            title: "Iniciar sesión",
            requireAuth: false,
          },
        },
        {
          path: "/create-account",
          props: true,
          name: "CreateAccount",
          component: () => import("../modules/auth/views/CreateAccount.vue"),
          meta: {
            title: "Crear Cuenta",
            requireAuth: false,
          },
        },
        {
          path: "/create-account-seller",
          props: true,
          name: "create-account-seller",
          component: () =>
            import("../modules/auth/views/CreateAccountSeller.vue"),
          meta: {
            title: "Crear cuenta emprendedor",
            requireAuth: false,
          },
        },
        {
          path: "/create-account-customer",
          props: true,
          name: "create-account-customer",
          component: () =>
            import("../modules/auth/views/CreateAccountCustomer.vue"),
          meta: {
            title: "Crear cuenta cliente",
            requireAuth: false,
          },
        },
        {
          path: "/create-account-delivery_man",
          props: true,
          name: "create-account-delivery_man",
          component: () =>
            import("../modules/auth/views/CreateAccountDelivery_Man.vue"),
          meta: {
            title: "Crear cuenta cliente",
            requireAuth: false,
          },
        },
        ...publicRouter,
        ...customerRouter,
        ...deliveryRouter,
      ],
    },
  ],
});

// Agregar un guardia global para verificar el token en el localStorage
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  // Verificar si la ruta requiere autenticación
  if (to.matched.some(record => record.meta.requireAuth)) {
    // Si no hay token, redirigir a la página de inicio
    if (!token) {
      Swal.fire({
        title: 'No autenticado',
        text: 'Necesitas iniciar sesión para acceder a esta página.',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
      }).then(() => {
        next({ path: '/sarti/home-page' }); // Redirigir a la página de inicio
      });
    } else {
      next(); // Continuar si hay token
    }
  } else {
    next(); // Si no requiere autenticación, permitir acceso
  }
});


export default router;
