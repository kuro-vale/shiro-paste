import {createRouter, createWebHistory} from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import store from "@/store";

function anonymousRoute() {
    return !store.state.currentUser;
}

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView
        },
        {
            path: "/login",
            name: "login",
            component: LoginView,
            beforeEnter: (to, from, next) => {
                if (anonymousRoute()) next()
                else next("/profile");
            }
        },
        {
            path: "/register",
            name: "register",
            component: RegisterView,
            beforeEnter: (to, from, next) => {
                if (anonymousRoute()) next()
                else next("/profile")
            }
        }
    ]
});

export default router;
