import * as React from "react";
import SendIcon from "@material-ui/icons/Send";

import { ResizeTextArea } from "../../../../components/base_ui/ResizeTextArea";

export interface IProps {
    sendMessage: (value: string) => any;
}

export interface IState {
    text_message: string;
}

export class ChatForm extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            text_message: ""
        };
    }
    sendMsg = (e: any) => {
        const { text_message } = this.state;
        if(text_message.trim().length > 0){
            this.props.sendMessage(text_message);
            this.setState({text_message : ""});
        }
    }
    handleKeyUp = (e:any) => {
        if(e.shiftKey && e.keyCode === 13){return false}
        if (e.key === 'Enter') {
            this.sendMsg(e);
        }
    };
    getValue = (value: string) => {
        this.setState({ text_message: value });
    };

    render() {
        return (
            <div className="chat-form__wrapper">
                <ResizeTextArea
                    onKeyUp={this.handleKeyUp}
                    valueCom={this.state.text_message}
                    id="chat-textarea-id"
                    maxHeight={50}
                    minHeight={50}
                    name="chat-textarea-name"
                    placeholder="Please write your message here ... "
                    className="chat-form__textarea"
                    eventChange={this.getValue}
                />
                <span onClick={this.sendMsg} className="chat-form__send-icon">
                    <SendIcon />
                </span>
            </div>
        );
    }
}
