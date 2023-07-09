import {ElNotification} from "element-plus";
import router from "@/router";

export const triggerNotification = (title, message, type, position = "top-left") => {
    ElNotification({
        title: title, message: message, type: type, position: position
    });
};

export function redirectTo(route) {
    // noinspection JSIgnoredPromiseFromCall
    router.push(route);
}