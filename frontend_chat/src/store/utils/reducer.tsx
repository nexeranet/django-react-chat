export const TOGGLE_LOADING = "TOGGLE_LOADING";
export const SHOW_ALERT = "SHOW_ALERT";
export const CLOSE_ALERT = "CLOSE_ALERT";

type loadingStore = {
    loading:boolean;
    notification: {
        isShow:boolean,
        message: string,
        type: string,
    }
}

const initialState:loadingStore = {
    loading:false,
    notification:{
        isShow: false,
        message: '',
        type: 'error',
    }
}
const showAlert = (state:any, action:any) => {
    return {
        ...state,
        notification:{
            isShow: true,
            message: action.payload.message,
            type: action.payload.type,
        },
    }
};

const closeAlert = (state:any, action:any) => {
    return {
        ...state,
        notification: initialState.notification
    }
};
const toggleLoading = (state:any, action:any) =>{
    return{
        ...state,
        loading:action.payload,
    }
};

const reducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        case TOGGLE_LOADING:
            return toggleLoading(state, action);
        case SHOW_ALERT:
            return showAlert(state, action);
        case CLOSE_ALERT:
            return closeAlert(state, action);
        default:
            return state;
    }
};
export default reducer;
