import * as React from "react";
import { connect } from "react-redux";
import ChatWb from "../../utils/wb/";
import ListIcon from '@material-ui/icons/List';
import { ChatsList } from "./components/ChatsList/ChatsList";
import { Messages } from "./components/ChatView/Messages";
import { ChatForm } from "./components/ChatView/ChatForm";
import {
    getChatDetailPromise,
    getUserDetailChatsPromise,
    addMessage,
    setMessages,
    setChat
} from "../../store/chat/actions";


import {compose} from 'redux';
import { authHoc, HocProps } from '../../hoc/authHOC'


export interface IProps extends HocProps {
    match: any;
    chat: any;
    history: any;
    messages: any;
    chats: any;
    getUserChatsPromise: any;
    getDetailsOfChat: any;
    addMessage: any;
    setMessages: any;
    setChat: any;
    setChats:any;
}

export interface IState {
    prev_chat_id: any;
    getChat: any;
    initChat: any;
}

class Chat extends React.Component<IProps, IState> {
    webSocket: any = null;
    try: number = 0;
    chatRef:any = null;

    initChat = (id:any) => {
        this.waitForSocketConnection(() => {
            ChatWb.get(this.props.auth.profile.id, id);
        });
        ChatWb.connect(id);
    };

    waitForSocketConnection(callback: any) {
        const timer = setTimeout(() => {
            if (ChatWb.state() === 1) {
                clearTimeout(timer);
                callback();
                return;
            } else {
                if (this.try > 5) {
                    return;
                }
                this.try++;
                this.waitForSocketConnection(callback);
            }
        }, 100);
    }

    newMessage = (message: any) => {
        if(message.participant.id === this.props.auth.profile.id){
            this.scrollBottom();
        }
        this.props.addMessage(message);
    };

    getMessages = (messages: any) => {
        this.scrollBottom();
        this.props.setMessages(messages);
    };

    wbOnError = (errors: any) => {
        console.log(errors);
    };
    scrollBottom = () => {
        const timer = setTimeout(() => {
            this.chatRef.current.scrollTop = this.chatRef.current.scrollHeight;
            clearTimeout(timer);
        }, 10)
    };
    sendMessage = (value: string) => {
        ChatWb.send({
            sender_id: this.props.auth.profile.id,
            content: value,
            chat_id: this.props.match.params.id
        });
    };

    constructor(props: IProps) {
        super(props);
        this.chatRef = React.createRef();
        this.state = {
            prev_chat_id: this.props.match.params.id,
            getChat: this.getChat,
            initChat: this.initChat,
        };
        ChatWb.setCallbacks(this.getMessages, this.newMessage, this.wbOnError);
    }

    componentDidMount = () => {
        this.getChat();
    };

    static getDerivedStateFromProps(props: IProps, state: IState){
        if (props.match.params.id !== state.prev_chat_id) {
            ChatWb.disconnect();
            props.loading(true);
            const timer = setTimeout(() => {
                state.initChat(props.match.params.id);
                props.loading(false);
                clearTimeout(timer);
            }, 400)
            return {
                prev_chat_id: props.match.params.id
            };
        }

        return null;
    }
    getChats = () => {
        this.props.getUserChatsPromise(this.props.auth.profile.id);
    };

    getChat = () => {
        const { id } = this.props.match.params;
        this.props
            .getDetailsOfChat(id)
            .then((chat: any) => {
                this.props.setChat(chat);
                this.initChat(id);
                this.getChats()
            })
            .catch((error: any) => {
                switch (error.response.status) {
                    case 403:
                        this.props.history.push('/')
                        break;
                    case 400:
                        this.props.history.push('/')
                        break;
                    case 404:
                        this.props.history.push("/");
                        break;
                    default:
                        console.log(error.response);
                        break;
                }
            });
    };

    goToChat = (id: any) => {
        console.log(id);
        return this.props.history.push(`${id}`);
    };
    backToList = () => {
        this.props.history.push('/');
    };
    render() {
        const { id } = this.props.match.params;
        const { profile } = this.props.auth;
        const { messages, chat, list } = this.props.chat;
        let render_messages =
            chat !== null ? (
                <Messages user_id={profile.id} messages={messages} />
            ) : (
                ""
            );

        return (
            <div>
                <div className="chat-container">
                    <div onClick={this.backToList} className="back-to-list-btn">
                        <ListIcon />
                    </div>
                    <div className="chat-row">
                        <div className="chat-row-el chats-list-col">
                            <ChatsList
                                goToChat={this.goToChat}
                                active_chat={Number.parseInt(id)}
                                chats={list}
                            />
                        </div>
                        <div className="chat-row-el chat-main-side">
                            <div className="chat-wrapper">
                                <div ref={this.chatRef} className="chat scrollbar">{render_messages}</div>
                                <div className="chat-form">
                                    <ChatForm sendMessage={this.sendMessage} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const matchDispatchToProps = (dispatch: any) => {
    return {
        getUserChatsPromise: (user_id: any) =>
            dispatch(getUserDetailChatsPromise(user_id)),
        getDetailsOfChat: (chat_id: any) =>
            dispatch(getChatDetailPromise(chat_id)),
        addMessage: (message: any) => dispatch(addMessage(message)),
        setMessages: (messages: any) => dispatch(setMessages(messages)),
        setChat: (chat: any) => dispatch(setChat(chat)),
    };
};
const mapStateToProps = (state: any) => {
    return {
        chat: state.chat
    };
};

export default compose(
    connect(mapStateToProps,matchDispatchToProps),
    authHoc,
)(Chat)
