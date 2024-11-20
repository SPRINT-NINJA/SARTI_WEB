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
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import { configure } from 'vee-validate';

// Registrar componentes globales
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

// Agregar todas las reglas predeterminadas
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

// Configurar mensajes globales opcionales
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  },
});

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(VueSweetalert2)

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
