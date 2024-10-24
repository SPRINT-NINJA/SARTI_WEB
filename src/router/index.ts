import Vue from 'vue';
import VueRouter from 'vue-router';
import Login_view from '@/views/Auth/login_view/Login_view.vue';
import login_view_password from '@/views/Auth/login_view/login_view_password.vue';
import create_account from '@/views/Auth/create_account/Create_account_select_rol.vue';
import home_view from '@/views/home/home_view.vue';

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [

    {
      path: '/login',
      name: 'login',
      component: Login_view
    },

    {
      path: '/',
      name: 'home-view',
      component: home_view
    },
    {
      path: '/login-password',
      name: 'login-password',
      component: login_view_password
    },
    {
      path: '/create-account',
      name: 'create-account',
      component: create_account
    },


  ]
})

export default router
