import React, {Suspense} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import Loader from "./components/loader";
import {connect} from "react-redux";
import ToasterService from "./services/toaster-service";
import AuthRoute from "./auth-routes";

const ViewAuth = React.lazy(() =>
    import(/* webpackChunkName: "views-auth" */ './pages/auth')
);
const ViewError = React.lazy(() =>
    import(/* webpackChunkName: "views-error" */ './pages/error')
);
const ViewInspection = React.lazy(() =>
    import(/* webpackChunkName: "views-inspection" */ './pages/inspection')
);

ToasterService.Configure();

function App(props) {
    const {loginUser} = props;

    const getRedirectPath = (loginUser) => {
        if (loginUser) {
            return '/' + loginUser.role;
        }
        return '/auth/login'
    }

    return (
        <React.Fragment>
            <Suspense fallback={<Loader/>}>
                <Router basename="/">
                    <Switch>
                        <AuthRoute
                            path="/inspector"
                            role={['inspector']}
                            authUser={loginUser}
                            component={ViewInspection}
                        />
                        <AuthRoute
                            path="/contractor"
                            role={['contractor']}
                            authUser={loginUser}
                            component={ViewInspection}
                        />
                        <Route
                            path="/auth"
                            render={props => !loginUser ? (
                                <ViewAuth {...props} />
                            ) : (
                                <Redirect
                                    to={{
                                        pathname: '/dashboard',
                                        state: {from: props.location}
                                    }}
                                />
                            )}
                        />
                        <Route
                            path="/error"
                            exact
                            render={props => <ViewError {...props} />}
                        />
                        <Redirect from="/" to={getRedirectPath(loginUser)}/>
                        <Redirect to="/error"/>
                    </Switch>
                </Router>
            </Suspense>
        </React.Fragment>
    );
}

const mapStateToProps = ({authUser}) => {
    const {user: loginUser} = authUser;
    return {loginUser};
};
const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(App);
