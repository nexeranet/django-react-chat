import * as React from "react";
import { Route, Redirect } from "react-router-dom";

export default (props: any) => {
    const { component, ...rest } = props;
    return localStorage.getItem("token") ? (
        <Route {...rest} component={component} />
    ) : (
        <Redirect to="/login" />
    );
};
