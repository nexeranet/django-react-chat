import * as React from "react";
import  Header from "./components/layaouts/Header";
import Router from "./router/Router";

export interface IProps {}
export interface IState {}

class App extends React.Component<IProps, IState> {
    render() {
        return (
            <div>
                <Header />
                <Router />
            </div>
        );
    }
};

export default App;

