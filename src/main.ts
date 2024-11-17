import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'
// Import Bootstrap and BootstrapVue CSS files (order is important)
import './assets/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import * as VeeValidate from 'vee-validate'; // Importa todo como un objeto
Vue.use(VeeValidate);
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(VueSweetalert2)

import { ValidationProvider, ValidationObserver } from 'vee-validate';

// Agrega los componentes como locales o globales
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);



new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
