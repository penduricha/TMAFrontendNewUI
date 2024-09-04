import LoginScreen from "@/login-page/LoginScreen.vue";
import Main from "@/components/Main.vue";
import SignUpScreen from "@/signup-page/SignupScreen.vue";

const routers = [
    { path: '/', component: LoginScreen },
    { path: '/main', component: Main, props: (route) => ({ emailMain: route.query.emailMain }) },
    { path: '/loginScreen', component: LoginScreen },
    { path: '/signUpScreen', component: SignUpScreen },
];
export default routers;
//trantam@edu.vn