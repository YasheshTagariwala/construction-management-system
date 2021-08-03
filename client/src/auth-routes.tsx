import React, {FC} from "react";
import {Redirect, Route} from "react-router-dom";

interface Props {
    component: any,
    authUser: any,
    role: any,
    path: string
}

const AuthRoute: FC<Props> = ({component: Component, authUser, role, path}) => {
    return (
        <Route
            path={path}
            render={props =>
                authUser ? (
                    role.includes(authUser.role) ? <Component {...props} authUser={authUser} /> : <Redirect
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