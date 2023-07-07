import {ElNotification} from "element-plus";

export const triggerNotification = (title, message, type, position = 'top-left') => {
    ElNotification({
        title: title, message: message, type: type, position: position
    })
}