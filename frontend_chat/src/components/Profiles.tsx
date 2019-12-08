import * as React from "react";
import {stdDate} from '../utils/date'

export interface IProps {
    profiles: any;
    createChat:any;
}

export interface IState {}

interface ELemProps {
    profile:any;
    createChat:any;
}

const Element: React.FC<ELemProps> = (props: any) => {
    const {avatar, user} = props.profile;
    return (
        <div className="profiles-list__card">
            <div className="profiles-list__info-row">
                <div className="profiles-list__avatar-box">
                    <img src={avatar} alt="avatar" />
                </div>
                <div className="profiles-list__info-box">
                    {user.username} / {user.first_name} {user.last_name}
                </div>
                <button className="profiles-list__create-btn" onClick={props.createChat}>Create</button>
            </div>
        </div>
    );
};

export default class Profiles extends React.Component<IProps, IState> {
    render() {
        const { profiles } = this.props;
        const chats_view = profiles.map((item: any) => {
            return (
                <li className="profiles-list__el" key={item.id}>
                    <Element
                        profile={item}
                        createChat={() => this.props.createChat(item.id)}
                    />
                </li>
            );
        });
        return (
            <div>
                <ul className="profiles-list">
                    {chats_view}
                </ul>
            </div>
        );
    }
}
