import Vue from 'vue';
import App from './App.vue';
import { BootstrapVue, IconsPlugin ,BLink } from 'bootstrap-vue'
import { router } from './router';
import store from './store';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VeeValidate from 'vee-validate';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Navbar from './views/Navbar.vue';
import VueParticles from 'vue-particles'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import {
    faHome,
    faUser,
    faUserPlus,
    faSignInAlt,
    faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt);
Vue.config.productionTip = false;
Vue.use(VueParticles)
Vue.use(VeeValidate);
Vue.use(Vuetify)
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('nav-bar', Navbar);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
// Vue.use(BLink)
Vue.component('b-link', BLink)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');