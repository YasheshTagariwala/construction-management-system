import React from "react";
import {Redirect, Route} from "react-router-dom";

const AuthRoute = ({component: Component, authUser, role, ...rest}) => {
    return (
        <Route
            {...rest}
            render={props =>
                authUser ? (
                    role.includes(authUser.role) ? <Component {...props} /> : <Redirect
                        to={{
                            pathname: '/' + authUser.role,
                            state: {from: props.location}
                        }}
                    />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/auth/login',
                            state: {from: props.location}
                        }}
                    />
                )
            }
        />
    );
};

export default AuthRoute
