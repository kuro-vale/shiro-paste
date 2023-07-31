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

export function getTheme() {
    let cname = "sceTheme=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === " ") {
            c = c.substring(1);
        }
        if (c.indexOf(cname) === 0) {
            return c.substring(cname.length, c.length);
        }
    }
    return "github";
}