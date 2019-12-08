import * as React from "react";
import { format } from 'date-fns'

export interface IProps {
    user_id:any;
    messages:any;
}

export interface IState {
}

const ReceiverMessage = (props:any) => {
    const { content, timestamp, participant } = props;
    return (
        <div className="message__box message__receiver">
            <div className="message__content">
                <div className="message__img-box">
                    <img src={participant.avatar} alt="receiver image" />
                </div>
                <div className="message__text-box">
                    <div className="message__text">
                        {content}
                    </div>
                    <div className="message__date">{format(new Date(timestamp), 'MM.dd.yyyy mm:ss a')}</div>
                </div>
            </div>
        </div>
    );
};

const UserMessage = (props:any) => {
    const {content, timestamp, participant} = props;
    return (
        <div className="message__box message__user">
            <div className="message__content">
                <div className="message__text-box">
                    <div className="message__text">
                        {content}
                    </div>
                    <div className="message__date">{format(new Date(timestamp), 'MM.dd.yyyy mm:ss a')}</div>
                </div>
                <div className="message__img-box auth-user">
                    <img src={participant.avatar} alt="receiver image" />
                </div>
            </div>
        </div>
    );
};

export class Messages extends React.Component<IProps, IState> {

    constructor(props: IProps){
        super(props);
        this.state = {};
    };

    render() {
        const {messages, user_id} = this.props;
        const render_msgs = messages.map((item: any) => {
            const message = item.participant.id == user_id ? UserMessage(item) : ReceiverMessage(item);
            return (
                <div key={ item.id } className="message">
                    { message }
                </div>
            )
        });
        return(
         <div className="chat__inner">
             { render_msgs }
         </div>
        );
    }
}
