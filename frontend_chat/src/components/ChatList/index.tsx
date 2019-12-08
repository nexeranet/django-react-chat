import * as React from "react";
import { format } from "date-fns";

export interface IProps {
    chats: any;
    goToChat: any;
    deleteChat: any;
}

export interface IState {}

interface ELemProps {
    chat: any;
    goToChat: any;
    deleteChat: any;
}

const empty_ls:any = {
    content: null,
    participant : {
        user: {
            username: null,
        }
    }
}

const Element: React.FC<ELemProps> = (props: any) => {
    const { participant, last_message, create_at} = props.chat;
    const ls_msg = last_message ? last_message : empty_ls;
    return (
        <div className="chat-card chat-card_with-b-border">
            <div className="chat-card__row">
                <div className="chat-card__user-img-box">
                    <img
                        className="chat-card__user-img"
                        src={participant.avatar}
                        alt="user image"
                    />
                </div>
                <div className="chat-card__main-box">
                    <div className="chat-card__date-name">
                        <div className="chat-card__name">
                            {participant.user.username}
                        </div>
                        <div className="chat-card__date">
                            {format(new Date(create_at), "MM.dd.yyyy mm:ss a")}
                        </div>
                    </div>
                    <div className="chat-card__last-message">
                        "last message / username": {ls_msg.content} /
                        {ls_msg.participant.user.username}
                    </div>
                    <div className="chat-card__control-row">
                        <button
                            onClick={props.goToChat}
                            className="chat-card__go-btn"
                        >
                            Go to chat
                        </button>
                        <button
                            onClick={props.deleteChat}
                            className="chat-card__delete-btn"
                        >
                            Delete chat
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default class ChatList extends React.Component<IProps, IState> {
    render() {
        const { chats } = this.props;
        const chats_view = chats.map((item: any) => {
            return (
                <li className="chats-list__el" key={item.id}>
                    <Element
                        chat={item}
                        goToChat={() => this.props.goToChat(item.id)}
                        deleteChat={() => this.props.deleteChat(item.id)}
                    />
                </li>
            );
        });
        return (
            <div>
                <ul className="chats-list chats-list_height-auto">
                    {chats_view}
                </ul>
            </div>
        );
    }
}
