import {
    TOGGLE_LOADING,
    SHOW_ALERT,
    CLOSE_ALERT,
} from './reducer'

export const toggleLoading = (payload:any) => {
    return {
        type: TOGGLE_LOADING,
        payload:payload
    }
}

export const showAlert = (payload:any) => {
    return {
        type: SHOW_ALERT,
        payload:payload,
    }
}

export const closeAlert = () => {
    return {
        type: CLOSE_ALERT,
    }
}

