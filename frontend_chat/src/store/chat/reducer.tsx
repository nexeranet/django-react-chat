import updateDict from "../tools";

export const ADD_MESSAGE = "ADD_MESSAGE";
export const SET_MESSAGES = "SET_MESSAGES";
export const GET_CHATS_SUCCESS = "GET_CHATS_SUCCESS";
export const SET_CHAT = "SET_CHAT";
export const SET_LIST = "SET_LIST";

const initialState: any = {
    messages: [],
    chats: [],
    list:[],
    chat: null
};

const addMessage = (state: any, action: any) => {
    return {
        ...state,
        messages: [action.message, ...state.messages]
    };
};

const setMessages = (state: any, action: any) => {
    return {
        ...state,
        messages: action.messages
    };
};

const setChats = (state: any, action: any) => {
    return {
        ...state,
        chats: action.chats
    };
};

const setList = (state: any, action: any) => {
    return {
        ...state,
        list: action.chats
    };
};

const setChat = (state: any, action: any) => {
    return {
        ...state,
        chat: action.chat
    };
};

const reducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        case ADD_MESSAGE:
            return addMessage(state, action);
        case SET_MESSAGES:
            return setMessages(state, action);
        case GET_CHATS_SUCCESS:
            return setChats(state, action);
        case SET_CHAT:
            return setChat(state, action);
        case SET_LIST:
            return setList(state, action);
        default:
            return state;
    }
};

export default reducer;
