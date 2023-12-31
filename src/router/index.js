import {createRouter, createWebHistory} from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "@/views/Auth/LoginView.vue";
import RegisterView from "@/views/Auth/RegisterView.vue";
import store from "@/store";
import ProfileView from "@/views/Auth/ProfileView.vue";
import UnauthorizedView from "@/views/Auth/UnauthorizedView.vue";
import {
    CREATE_ROUTE,
    EDIT_PASTE_ROUTE,
    HOME_ROUTE,
    LOGIN_ROUTE,
    MY_PASTES_ROUTE,
    NOT_FOUND_ROUTE,
    PROFILE_ROUTE,
    REGISTER_ROUTE,
    SHOW_PASTE_ROUTE,
    STARGAZERS_ROUTE,
    UNAUTHORIZED_ROUTE,
    USER_PASTES_ROUTE
} from "@/constants";
import CreatePasteView from "@/views/Pastes/CreatePasteView.vue";
import ShowPasteView from "@/views/Pastes/ShowPasteView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import EditPasteView from "@/views/Pastes/EditPasteView.vue";
import MyPastesView from "@/views/Pastes/MyPastesView.vue";
import UserPastesView from "@/views/Pastes/UserPastesView.vue";
import ShowPasteStargazersView from "@/views/Pastes/ShowPasteStargazersView.vue";

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
            },
        },
        {
            path: UNAUTHORIZED_ROUTE,
            name: "unauthorized",
            component: UnauthorizedView,
        },
        {
            path: CREATE_ROUTE,
            name: "create",
            component: CreatePasteView,
            beforeEnter: (to, from, next) => {
                if (authRoute()) next();
                else next("/login");
            },
        },
        {
            path: SHOW_PASTE_ROUTE,
            name: "show",
            component: ShowPasteView,
        },
        {
            path: EDIT_PASTE_ROUTE,
            name: "edit",
            component: EditPasteView,
            beforeEnter: (to, from, next) => {
                if (authRoute()) next();
                else next("/login");
            },
        },
        {
            path: NOT_FOUND_ROUTE,
            name: "Not found",
            component: NotFoundView,
        },
        {
            path: MY_PASTES_ROUTE,
            name: "My pastes",
            component: MyPastesView,
            beforeEnter: (to, from, next) => {
                if (authRoute()) next();
                else next("/login");
            },
        },
        {
            path: USER_PASTES_ROUTE,
            name: "user pastes",
            component: UserPastesView,
        },
        {
            path: STARGAZERS_ROUTE,
            name: "stargazers",
            component: ShowPasteStargazersView,
        },
    ]
});

export default router;
