export const SET_USER = "SET_USER";
export const AUTH_FAIL = "AUTH_FAIL";
export const LOGOUT = "LOGOUT";
export const REFRESH_TOKEN = "REFRESH_TOKEN";

const empty_profile = {
    avatar: '/media/default.png',
    id: 0,
    user:{
        username: "",
        email: "",
        last_name: "",
        first_name: ""
    },
};

type authStore = {
    profile:any ;
    token:any;
    isAuth:boolean;
    error:any;
};

const initialState: authStore = {
    profile: window.AUTH  ? window.AUTH.profile : empty_profile ,
    token: window.AUTH  ? window.AUTH.token : '',
    isAuth:window.AUTH ? true : false,
    error: null,
};
const setUser = (state: any, action: any) => {
    return {
        ...state,
        profile:action.payload.profile,
        token: action.payload.token,
        isAuth: true,
    }
};

const logout = (state:any, action:any) => {
    return {
        ...state,
        profile:action.payload.profile,
        token: action.payload.token,
        isAuth: false,
    }
}
const authFail = (state:any, action:any) => {
    return {
        ...state,
        error: action.error,
        loading: false
    }
};

const refreshToken = (state: any, action:any) => {
    return {
        ...state,
        token: action.token,
    }
}
const reducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        case SET_USER:
            return setUser(state, action);
        case LOGOUT:
            return logout(state, action);
        case AUTH_FAIL:
            return authFail(state, action);
        case REFRESH_TOKEN:
            return refreshToken(state, action);
        default:
            return state;
    }
};

export default reducer;
