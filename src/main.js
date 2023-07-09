import "./assets/main.css";

import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import {createStore} from "vuex";
import {JWT_KEY} from "@/constants";
import jwtDecode from "jwt-decode";

const store = createStore({
    state() {
        return {
            currentUser: null
        };
    },
    mutations: {
        setCurrentUser(state) {
            const token = sessionStorage.getItem(JWT_KEY) || localStorage.getItem(JWT_KEY);
            if (token) state.currentUser = jwtDecode(token);
        }
    }
});

const app = createApp(App);

app.use(router);
app.use(store);

app.mount("#app");
