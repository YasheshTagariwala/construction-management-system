import React, {Suspense} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

const Login = React.lazy(() =>
    import(/* webpackChunkName: "user-login" */ './login')
);

const Auth = (props: any) => {
    return (
        <Suspense fallback={<div className="loading"/>}>
            <Switch>
                <Redirect exact from={`${props.match.url}/`} to={`${props.match.url}/login`}/>
                <Route
                    path={`${props.match.url}/login`}
                    render={props => <Login {...props} />}
                />
                <Redirect to="/error"/>
            </Switch>
        </Suspense>
    );
};

export default Auth;
