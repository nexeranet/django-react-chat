import * as React from "react";

import CloseIcon from "@material-ui/icons/Close";

export interface IProps {
    alert: any;
    close: any;
}

export interface IState {
    show: boolean;
}

export default class Alert extends React.Component<IProps, IState> {
    colors: any = {
        error: "#DB4437",
        info: "#F4B400",
        success: "#0F9D58"
    };

    timeout: number = 4000;
    timer:any = null;

    constructor(props: IProps) {
        super(props);
        this.state = {
            show: false
        };
    }
    closeTimer = () => {
        this.timer = setTimeout(() => {
            this.fadeTimer(false, 500, () => {
                this.props.close();
            });
            this.setState({ show: false });
            clearTimeout(this.timer);
        }, this.timeout);
    };
    fadeTimer = (show: boolean, timeout: number, callback: any) => {
        const timer = setTimeout(() => {
            this.setState({ show: show });
            callback();
            clearTimeout(timer);
        }, timeout);
    };
    componentDidMount = () => {
        this.fadeTimer(true, 10, () => {});
        this.closeTimer();
    };
    closeClick = () => {
        this.fadeTimer(false, 500, () => {
            this.props.close();
        });
        clearTimeout(this.timer);
        this.setState({ show: false });
    };
    render() {
        const { message, type } = this.props.alert;
        const { show } = this.state;
        const class_name = show
            ? "global-alert global-alert__active"
            : "global-alert";
        const bg = type ? this.colors[type] : this.colors["error"];
        return (
            <div className={class_name}>
                <div
                    className="global-alert__notification-container"
                    style={{ backgroundColor: bg }}
                >
                    <div onClick={this.closeClick} className="global-alert__close">
                        <CloseIcon />
                    </div>
                    <div className="global-alert__message-box">{message}</div>
                </div>
            </div>
        );
    }
}
