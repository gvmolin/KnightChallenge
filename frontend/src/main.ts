import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
// import * as dotEnv from 'dotenv';

const pinia = createPinia();
// dotEnv.config();

createApp(App)
    .use(router)
    .use(pinia)
    .mount('#app')
