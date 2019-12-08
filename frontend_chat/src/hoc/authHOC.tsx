import {connect} from 'react-redux';
import * as React from 'react';
import { Redirect } from 'react-router-dom';
import {toggleLoading, showAlert} from '../store/utils/actions';
import {refreshTokenPromise, handleLogoutPromise } from '../store/auth/actions';
import Submenu from '../components/layaouts/Submenu'
export interface HocProps {
    auth:any;
    loading:any;
    show_alert:any;
    history:any;
    logout:any;
    login:any;
    refreshToken: (token:string) => any;
}

interface HocState {
    refresh: boolean;
};
const mapStateToProps = (state:any) => {
    return {
        auth: state.auth,
    }
}

const mapDispatchToProps = (dispatch:any) => {
    return {
        loading: (bol:any) => dispatch(toggleLoading(bol)),
        show_alert: (notification:any) => dispatch(showAlert(notification)),
        refreshToken: (token:string) => dispatch(refreshTokenPromise(token)),
        logout: () => dispatch(handleLogoutPromise()),
    }
}

export const authHoc = (Component:React.ComponentType) => {
    class HOC extends React.Component<HocProps> {
        state:HocState = {
            refresh: false,
        }
        checkToken = () => {
            const auth = window.AUTH;
            if(auth === null) {
                localStorage.removeItem('token');
            } else {
                this.props.refreshToken(auth.token).then((data:any) => {
                    localStorage.setItem('token', data.token)
                }).catch((err:any) => {
                    this.props.show_alert({message:err.response.message, type: 'error'})
                    this.props.logout()
                    this.props.history.push('/login')
                })
            }
        }
        constructor(props:HocProps){
            super(props);
            this.checkToken();
        }
        render(){
            return this.props.auth.isAuth ? (
                <div>
                    <Submenu {...this.props} />
                    <Component {...this.props} />
                </div>
            ) : <Redirect to="/login" />
        }
    }
    return connect(mapStateToProps, mapDispatchToProps)(HOC)
}

