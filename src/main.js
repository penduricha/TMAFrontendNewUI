import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import App from "@/App.vue";
import Main from "@/components/Main.vue";
const router = createRouter({
    // mode: 'history',
    history: createWebHistory(),
    //ten bien du lieu truyen qua ko duoc trung
    routes: [
        { path: '/', component: App},
        { path: '/main', component: Main },
    ]
})
const app = createApp(App);
app.use(router)
//Dat con tro khi load man hinh, man hinh tro den khi chay main.js
router.push('/main')
    // router.push('/main')
    .catch((error) => {
        console.error('Error navigating: ', error);
    });
app.mount('#app')