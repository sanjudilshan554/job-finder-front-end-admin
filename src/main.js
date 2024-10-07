// import './assets/main.css'
import './vendor/bootstrap/css/bootstrap.css'
import './vendor/bootstrap/css/bootstrap.min.css'
import './vendor/css/colors/default.css'
import './vendor/perfect-scrollbar/css/perfect-scrollbar.css'
import './vendor/morrisjs/morris.css'
import './vendor/c3-master/c3.min.css'
import './vendor/css/pages/dashboard1.css'
import './vendor/bootstrap/css/bootstrap.min.css'
import './vendor/css/colors/default.css'
import './vendor/css/style.css'

import './vendor/bootstrap/js/bootstrap.bundle.min.js';
import './vendor/js/perfect-scrollbar.jquery.min.js';
import './vendor/js/waves.js';
// import './vendor/morrisjs/morris.min.js';
// import './vendor/js/custom.min.js';
// import './vendor/d3/d3.min.js';  
// import './vendor/c3-master/c3.min.js';  
// import './vendor/js/dashboard1.js';

import { createApp } from 'vue'
import App from './layout/AppLayout.vue'
import router from './router'

// src/layout/AppLayout.vue

const app = createApp(App)

app.use(router)

app.mount('#app')
