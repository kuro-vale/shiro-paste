import {createRouter, createWebHistory} from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import store from "@/store";
import ProfileView from "@/views/ProfileView.vue";
import UnauthorizedView from "@/views/UnauthorizedView.vue";
import {HOME_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, REGISTER_ROUTE, UNAUTHORIZED_ROUTE} from "@/constants";

function anonymousRoute() {
    return !store.state.currentUser;
}

function authRoute() {
    return !anonymousRoute();
}

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: HOME_ROUTE,
            name: "home",
            component: HomeView,
        },
        {
            path: LOGIN_ROUTE,
            name: "login",
            component: LoginView,
            beforeEnter: (to, from, next) => {
                if (anonymousRoute()) next();
                else next("/profile");
            },
        },
        {
            path: REGISTER_ROUTE,
            name: "register",
            component: RegisterView,
            beforeEnter: (to, from, next) => {
                if (anonymousRoute()) next();
                else next("/profile");
            },
        },
        {
            path: PROFILE_ROUTE,
            name: "profile",
            component: ProfileView,
            beforeEnter: (to, from, next) => {
                if (authRoute()) next();
                else next("/login");
            }
        },
        {
            path: UNAUTHORIZED_ROUTE,
            name: "unauthorized",
            component: UnauthorizedView,
        }
    ]
});

export default router;
