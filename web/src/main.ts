import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'
import './assets/progressBar.css'
import './assets/styleSideBar.css'
// Import Bootstrap and BootstrapVue CSS files (order is important)
import '@/assets/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@/assets/styleSideBar.css'
import '@/assets/progressBar.css'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Vuelidate from 'vuelidate';
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(VueSweetalert2)
Vue.use(Vuelidate);


new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
