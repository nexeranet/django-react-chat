import api from "../../utils/api/index";

import { SET_USER, AUTH_FAIL, LOGOUT, REFRESH_TOKEN } from "./reducer";

import {toggleLoading, showAlert} from '../utils/actions'

const not_auth = {
    profile: {
        avatar: '/media/default.png',
        user: {
            id: 0,
            username: "",
            email: "",
            last_name: "",
            first_name: ""
        },
    },
    token: "",
};
export const setUser = (payload: any) => {
    return {
        type: SET_USER,
        payload: payload
    };
};

export const logout = (payload: any) => {
    return {
        type: LOGOUT,
        payload: payload
    };
};

export const authFail = (error: any) => {
    return {
        type: AUTH_FAIL,
        error: error
    };
};


export const refreshToken = (token:any) => {
    return {
        type: REFRESH_TOKEN,
        token: token,
    }
}
export const refreshTokenPromise = (token:any) => (dispatch:any) => {
    return new Promise((resolve, rejects) => {
        dispatch(toggleLoading(true))
        api.post('/token-refresh', {
            token: token
        }).then((data) => {
            dispatch(refreshToken(data.data.token))
            api.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${data.data.token}`;
            localStorage.setItem("token", data.data.token);
            dispatch(toggleLoading(false))

            resolve(data.data);
        }).catch((err) => rejects(err))
    });
}

export const handleLoginPromise = (username: string, password: string) => (
    dispatch: any
) => {
    return new Promise((resolve, rejects) => {
        dispatch(toggleLoading(true))
        api.post("/auth/login/", {
            username: username,
            password: password
        })
            .then((data: any) => {
                if (data.status === 200) {
                    api.defaults.headers.common[
                        "Authorization"
                    ] = `Bearer ${data.data.token}`;
                    localStorage.setItem("token", data.data.token);
                    dispatch(setUser(data.data));
                    dispatch(toggleLoading(false))
                    resolve();
                }
            })
            .catch((error: any) => {
                dispatch(authFail(error));
                dispatch(toggleLoading(false))
                switch(error.response.status){
                    case 401:
                        dispatch(showAlert({type:"error", message: 'incorrect username or password' + error.response.data}))
                        break;
                    case dispatch:
                        break;
                }
                rejects(error);
            });
    });
};


export const handleLogoutPromise = () => (dispatch:any) => {
    return new Promise((resolve, rejects) => {
        dispatch(toggleLoading(true))
        api.get("/auth/logout/")
        .then((data: any) => {
            dispatch(toggleLoading(false))
            dispatch(logout(not_auth));
            localStorage.removeItem('token');
            resolve();
        })
        .catch((error: any) => {
            dispatch(authFail(error));
            dispatch(toggleLoading(false))
            rejects(error);
        });
    });
};

export const handleRegisterPromise = (user:any) => (dispatch:any) => {
    return new Promise((resolve, rejects) => {
        dispatch(toggleLoading(true))
        api.post("/auth/register/", user)
        .then((data: any) => {
            if (data.status === 201) {
                api.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${data.data.token}`;
                localStorage.setItem("token", data.data.token);
                dispatch(setUser(data.data));
            }
            dispatch(toggleLoading(false))
            resolve();
        })
        .catch((error: any) => {
            dispatch(authFail(error));
            dispatch(toggleLoading(false))
            rejects();
        });
    });
};

export const handleGetProfilePromise = () => (dispatch:any) => {
    return new Promise((resolve, rejects) => {
        dispatch(toggleLoading(true))
        api.get('auth/profile/').then((data:any) => {
            dispatch(setUser(data.data));
            dispatch(toggleLoading(false))
            resolve()
        }).catch((error: any) => {
            dispatch(authFail(error));
            dispatch(toggleLoading(false))
            rejects();
        });

    })
}

export const searchProfile = (search:any) => (dispatch:any) => {
    return new Promise((resolve, rejects) => {
        api.post('auth/search-profiles/', {username : search}).then((data:any) => {
            resolve(data.data.profiles);
        }).catch((error:any) => {
            rejects(error);
        });
    })
}
