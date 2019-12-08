import * as React from "react";
import { connect } from "react-redux";
import {handleRegisterPromise} from '../../store/auth/actions';

type Erorrs = {
    [key: string]: any;
    email: string;
    username: string;
    password_rep: string;
    password: string;
    last_name: string;
    first_name: string;
};
export interface IProps {
    history:any;
    auth:any;
    handleRegister: (user:any) => any;
}

export interface IState {
    [key: string]: any;
    email: string;
    form_valid: boolean;
    username: string;
    password_rep: string;
    password: string;
    last_name: string;
    first_name: string;
    errors: Erorrs;
}

class Registration extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            form_valid: false,
            username: "",
            email: "",
            password: "",
            password_rep: "",
            last_name: "",
            first_name: "",
            errors: {
                username: "",
                email: "",
                password: "",
                password_rep: "",
                last_name: "",
                first_name: ""
            }
        };
    }
    handleUserInput = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value }, () => {
            this.validateField(name, value);
        });
    };
    handleSubmit = () => {
        const { username, email, password, last_name, first_name } = this.state;
        const user = {
            username,
            email,
            password,
            last_name,
            first_name,
        }
        this.props.handleRegister(user).then(() => {
            this.props.history.push('/');
        });
    };
    validateForm = () => {
        const state = [
            this.state.username,
            this.state.password,
            this.state.password_rep,
            this.state.email,
            this.state.last_name,
            this.state.first_name
        ];
        const fields_valid = state.every(item => item.length > 0);
        const errors = Object.values(this.state.errors);
        const errors_valid = errors.every(item => item.length === 0);
        console.log(errors_valid, fields_valid);
        this.setState({ form_valid: errors_valid && fields_valid });
        return errors_valid && fields_valid;
    };
    validateField = (fieldName: any, value: any) => {
        let errors = { ...this.state.errors };
        switch (fieldName) {
            case "password":
                if (value.length < 6) {
                    errors.password = "password is too short";
                } else if (value !== this.state.password_rep) {
                    errors.password = "passwords not match";
                } else {
                    errors.password = "";
                    errors.password_rep = "";
                }
                break;
            case "password_rep":
                if (value.length < 6) {
                    errors.password_rep = "password is too short";
                } else if (value !== this.state.password) {
                    errors.password_rep = "passwords not match";
                } else {
                    errors.password = "";
                    errors.password_rep = "";
                }
                break;
            case "username":
                errors.username =
                    value.length >= 6 ? "" : "username is invalid";
                break;
            case "last_name":
                errors.last_name =
                    value.length >= 2 ? "" : "last name is invalid";
                break;
            case "first_name":
                errors.first_name =
                    value.length >= 2 ? "" : "first name is invalid";
                break;
            case "email":
                errors.email = value.match(
                    /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
                )
                    ? ""
                    : "email is invalid";
                break;
            default:
                break;
        }
        this.setState({ errors: errors });
    };
    render() {
        return (
            <div className="sign-page">
                <div className="sign-page__row">
                    <div className="sign-page__form">
                        <div className="sign-page__input-box">
                            <input
                                className="sign-page__input"
                                name="username"
                                onChange={this.handleUserInput}
                                type="text"
                                placeholder="username"
                            />
                            {SpanError(this.state.errors.username)}
                        </div>
                        <div className="sign-page__input-box">
                            <input
                                className="sign-page__input"
                                name="email"
                                onChange={this.handleUserInput}
                                type="text"
                                placeholder="email"
                            />
                            {SpanError(this.state.errors.email)}
                        </div>
                        <div className="sign-page__input-box">
                            <input
                                className="sign-page__input"
                                type="password"
                                name="password"
                                onChange={this.handleUserInput}
                                placeholder="password"
                            />
                            {SpanError(this.state.errors.password)}
                        </div>
                        <div className="sign-page__input-box">
                            <input
                                className="sign-page__input"
                                type="password"
                                name="password_rep"
                                onChange={this.handleUserInput}
                                placeholder="Repeat password"
                            />
                            {SpanError(this.state.errors.password_rep)}
                        </div>
                        <div className="sign-page__input-box">
                            <input
                                className="sign-page__input"
                                type="text"
                                name="first_name"
                                onChange={this.handleUserInput}
                                placeholder="First name"
                            />
                            {SpanError(this.state.errors.first_name)}
                        </div>
                        <div className="sign-page__input-box">
                            <input
                                className="sign-page__input"
                                type="text"
                                name="last_name"
                                onChange={this.handleUserInput}
                                placeholder="Last name"
                            />
                            {SpanError(this.state.errors.last_name)}
                        </div>
                        <button
                            onClick={this.handleSubmit}
                            className="sign-page__submit-btn"
                        >
                            Registration
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const SpanError = (props: any) => {
    return <div className="span-error">{props}</div>;
};

const matchDispatchToProps = (dispatch:any) => {
    return {
        handleRegister : (user:any) => dispatch(handleRegisterPromise(user)),
    }
};

const mapStateToProps = (state:any) => {
    return {
        auth: state.auth,
    }
};
export default connect(mapStateToProps, matchDispatchToProps)(Registration);
