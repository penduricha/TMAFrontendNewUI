import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from "@/App.vue";
import routers from "@/listRouters.js";
import LoginScreen from "@/login-page/LoginScreen.vue";
import Main from "@/components/Main.vue";
import SignUpScreen from "@/signup-page/SignupScreen.vue";
import ProfileService from "@/services/ProfileService.js";


function initRouter(routers)
{
    const router = createRouter({
        // mode: 'history',
        history: createWebHistory(),
        //ten bien du lieu truyen qua ko duoc trung
        routes: routers,
    })
    const app = createApp(App);
    app.use(router);
    //Dat con tro khi load man hinh, man hinh tro den khi chay main.js
    //push quay ve duoc con replace ko quay ve
    router.replace('/').catch((error) => { console.error('Error navigating: ', error); });
    app.mount('#app')
}

async function getAccessByEmail(email){
    let profileCheck=null;
    let access=false;
    await ProfileService.getProfileByEmail(email).then(response => {
        profileCheck = response.data;
    }).catch(error => {
        console.error(error);
    });
    access=await profileCheck.access;
    return access;
}

function initRouterWithEmail(email)
{
    const router = createRouter({
        // mode: 'history',
        history: createWebHistory(),
        //ten bien du lieu truyen qua ko duoc trung
        routes: [
            { path: '/', component: Main, props: () => ({ emailMain: email})},
            { path: '/main', component: Main, props: (route) => ({ emailMain: route.query.emailMain })},
            { path: '/loginScreen', component: LoginScreen },
            { path: '/signUpScreen', component: SignUpScreen },
        ],
    })
    const app = createApp(App);
    app.use(router);
    router.replace('/').catch((error) => { console.error('Error navigating: ', error); });
    app.mount('#app')
}
console.log(localStorage.getItem('email'))

let access=await getAccessByEmail(localStorage.getItem('email'));

if(access){
    initRouterWithEmail(localStorage.getItem('email'));
}else{
    initRouter(routers);
}

