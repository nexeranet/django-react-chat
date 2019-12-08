import * as React from "react";
import { ChatsSearchForm } from "./ChatsSearchForm";
import { format } from 'date-fns';

export interface IProps {
    chats: any;
    active_chat: number;
    goToChat:any;
}

export interface IState {}


interface ELemProps {
    chat: any;
    goToChat: any;
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
        <div onClick={props.goToChat} className="chat-card hover-active">
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
                </div>
            </div>
        </div>
    );
};
export class ChatsList extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {};
    }

    render() {
        const { chats, active_chat } = this.props;
        let chats_view = chats.map((item: any) => {
            const zlass =
                item.id === active_chat
                    ? "chats-list__el active"
                    : "chats-list__el";
            return (
                <li  className={zlass} key={item.id}>
                    <Element goToChat={() => this.props.goToChat(item.id)} chat={item} />
                </li>
            );
        });
        return (
            <div className="chats-side-tab">
                <ChatsSearchForm />
                <ul className="chats-list">{chats_view}</ul>
            </div>
        );
    }
}
