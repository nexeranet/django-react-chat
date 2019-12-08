import api from "../../utils/api/index";
import {
    ADD_MESSAGE,
    GET_CHATS_SUCCESS,
    SET_MESSAGES,
    SET_CHAT,
    SET_LIST,
} from "./reducer";

import {toggleLoading} from '../utils/actions'

export const setChat = (chat:any) => {
    return {
        type: SET_CHAT,
        chat: chat,
    }
};

export const addMessage = (message: any) => {
    return {
        type: ADD_MESSAGE,
        message: message
    };
};

export const setMessages = (messages: any) => {
    return {
        type: SET_MESSAGES,
        messages: messages
    };
};

export const getUserChatsSuccess = (chats: any) => {
    return {
        type: GET_CHATS_SUCCESS,
        chats: chats
    };
};

export const setList = (chats: any) => {
    return {
        type: SET_LIST,
        chats: chats
    };
};

export const createChatPromise = (participants:any) => (dispatch:any) => {
    return new Promise( (resolve, rejects) =>{
        console.log(participants);
        api.post('/chat/create/', {
            datatext: "new chat",
            users: participants,
        }).then((res:any) => {
            resolve(res.data);
        }).catch((error) => {
            rejects(error);
        });
    });
};

export const getUserDetailChatsPromise = (user_id:any) => (dispatch:any) => {
    return new Promise((resolve, rejects) => {
        dispatch(toggleLoading(true))
        api.post('chat/chats/', {
            user_id: user_id
        }).then((data:any) => {
            dispatch(toggleLoading(false))
            dispatch(setList(data.data.chats))
            resolve(data.data)
        }).catch((error) => {
            dispatch(toggleLoading(false))
            rejects(error);
        })
    })
};
export const getUserChatsPromise = (user_id:any) => (dispatch:any) => {
    return new Promise((resolve, rejects) => {
        dispatch(toggleLoading(true))
        api.post('chat/list/', {
            user_id: user_id
        }).then((data:any) => {
            dispatch(toggleLoading(false))
            dispatch(getUserChatsSuccess(data.data.chats))
            resolve(data.data)
        }).catch((error) => {
            dispatch(toggleLoading(false))
            rejects(error);
        })
    })
};

export const getChatDetailPromise = (chat_id:any) => (dispatch:any) => {
    return new Promise((resolve, rejects) => {
        dispatch(toggleLoading(true));
        api.post(`chat/${chat_id}`).then((data:any) => {
            dispatch(toggleLoading(true))
            resolve(data.data.chat);
        }).catch((error:any) => {
            dispatch(toggleLoading(false));
            rejects(error);
        });
    })
}
