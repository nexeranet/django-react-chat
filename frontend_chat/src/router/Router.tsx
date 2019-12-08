import * as React from "react";
import { Route, Switch } from "react-router-dom";
import Chat from "../pages/Chat/Chat";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import Main from "../pages/Main/Main";
import NoMatch from "../pages/404/NoMatch";

class Router extends React.Component<{}> {
    render() {
        return (
            <div className="router-root">
                <Switch>
                    <Route exact path="/" component={Main} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/reg" component={Registration} />
                    <Route exact path="/chat/:id?" component={Chat} />
                    <Route component={NoMatch} />
                </Switch>
            </div>
        );
    }
}
export default Router;
