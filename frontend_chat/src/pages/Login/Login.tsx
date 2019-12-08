import * as React from "react";
import { connect } from "react-redux";
import {
    handleLoginPromise,
} from '../../store/auth/actions';


export interface IProps {
    history: any;
    auth:any;
    handleLogin: (username:string, password:string) => any;
}

export interface IState {
    [key: string]: any;
    username: string;
    password: string;
    form_valid: boolean;
    errors: {
        username: {
            error: string;
            valid: boolean;
        };
        password: {
            error: string;
            valid: boolean;
        };
    };
}

class Login extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            form_valid: false,
            username: "",
            password: "",
            errors: {
                username: {
                    error: "",
                    valid: false
                },
                password: {
                    error: "",
                    valid: false
                }
            }
        };
    }
    handleSubmit = () => {
        const { form_valid, password, username } = this.state;
        if (form_valid === true) {
            this.props.handleLogin(username, password).then(()=>{
                this.props.history.push('/');
            });
        }
    };
    handleUserInput = (e: any) => {
        const { name, value } = e.target;
        this.setState({ [name]: value }, () => {
            this.validateField(name, value);
        });
    };

    validateField = (fieldName: any, value: any) => {
        let fieldValidationErrors = { ...this.state.errors };
        let userValid, passwordValid;
        switch (fieldName) {
            case "username":
                userValid = value.length >= 5;
                fieldValidationErrors.username.error = userValid
                    ? ""
                    : "username is invalid";
                fieldValidationErrors.username.valid = userValid;
                break;
            case "password":
                passwordValid = value.length >= 6;
                fieldValidationErrors.password.error = passwordValid
                    ? ""
                    : "password is too short";
                fieldValidationErrors.password.valid = passwordValid;
                break;
            default:
                break;
        }
        this.setState({ errors: fieldValidationErrors }, this.validateForm);
    };
    validateForm() {
        this.setState({
            form_valid:
                this.state.errors.username.valid &&
                this.state.errors.password.valid
        });
    };
    render() {
        return (
            <div className="sign-page">
                <div className="sign-page__row">
                    <div className="sign-page__form">
                        <div className="sign-page__input-box">
                            <input
                                className="sign-page__input"
                                type="text"
                                name="username"
                                onChange={this.handleUserInput}
                                placeholder="username"
                            />
                            { SpanError(this.state.errors.username) }
                        </div>
                        <div className="sign-page__input-box">
                            <input
                                className="sign-page__input"
                                type="password"
                                name="password"
                                onChange={this.handleUserInput}
                                placeholder="password"
                            />
                            { SpanError(this.state.errors.password) }
                        </div>

                        <button
                            className="sign-page__submit-btn"
                            onClick={this.handleSubmit}
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const SpanError = (props: any) => {
    const { error, valid } = props;
    const error_msg = valid === true ? "" : error;
    return <div className="span-error">{error_msg}</div>;
};

const matchDispatchToProps = (dispatch:any) => {
    return {
        handleLogin : (username:string, password:string) => dispatch(handleLoginPromise(username, password)),
    }
};

const mapStateToProps = (state:any) => {
    return {
        auth: state.auth,
    }
};
export default connect(mapStateToProps, matchDispatchToProps)(Login);
