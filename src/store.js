import {createStore} from "vuex";
import {JWT_KEY} from "@/constants";
import jwtDecode from "jwt-decode";

const store = createStore({
    state() {
        return {
            currentUser: null
        };
    }, mutations: {
        setCurrentUser(state) {
            const token = sessionStorage.getItem(JWT_KEY) || localStorage.getItem(JWT_KEY);
            if (token) state.currentUser = jwtDecode(token);
        },
        logout(state) {
            sessionStorage.clear();
            localStorage.clear();
            state.currentUser = null;
        }
    }
});

export default store;