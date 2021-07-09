import React, {FC} from "react";
import {Redirect, Route} from "react-router-dom";

interface Props {
    component: any,
    authUser: any,
    role: any
}

const AuthRoute: FC<Props> = ({component: Component, authUser, role, ...rest}) => {
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