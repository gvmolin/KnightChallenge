import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import {LoadingPlugin} from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

const pinia = createPinia();
// dotEnv.config();

createApp(App)
    .use(router)
    .use(pinia)
    .use(LoadingPlugin)
    .mount('#app')
