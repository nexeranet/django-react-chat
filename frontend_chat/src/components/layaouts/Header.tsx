import * as React from "react";
import { connect } from "react-redux";
import Alert from "../base_ui/Alert";
import { closeAlert } from "../../store/utils/actions";

export interface HeaderProps {
    utils: any;
    closeAlert: any;
    auth:any;
}
export interface HeaderState {}


class Header extends React.Component<HeaderProps, HeaderState> {
    constructor(props: HeaderProps) {
        super(props);
    }
    closeAlert = () => {
        this.props.closeAlert();
    };
    render() {
        const { loading, notification } = this.props.utils;
        const loading_style = loading === true ? "flex" : "none";
        let loading_class =
            loading === true ? "active global-loader" : "global-loader";
        const notification_render = notification.isShow ? (
            <Alert alert={notification} close={this.closeAlert} />
        ) : null;
        return (
            <div className="header">
                <div
                    className={loading_class}
                    style={{ display: loading_style }}
                >
                    <div className="sk-folding-cube">
                        <div className="sk-cube sk-cube-1"></div>
                        <div className="sk-cube sk-cube-2"></div>
                        <div className="sk-cube sk-cube-3"></div>
                        <div className="sk-cube sk-cube-4"></div>
                    </div>
                </div>
                {notification_render}
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        utils: state.utils,
        auth: state.auth,
    };
};

const matchDispatchToProps = (dispatch: any) => {
    return {
        closeAlert: () => dispatch(closeAlert()),
    };
};


export default connect(
    mapStateToProps,
    matchDispatchToProps
)(Header);

