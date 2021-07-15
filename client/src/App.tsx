import React, {Suspense} from 'react';
// import Header from "./layouts/header";
// import Footer from "./layouts/footer";
// import Login from "./pages/login";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import Loader from "./components/loader";
import {connect} from "react-redux";

const ViewAuth = React.lazy(() =>
    import(/* webpackChunkName: "views-auth" */ './pages/auth')
);
const ViewError = React.lazy(() =>
    import(/* webpackChunkName: "views-error" */ './pages/error')
);

interface Props {
    loginUser: any
}

function App(props: Props) {
    const {loginUser} = props;

    const getRedirectPath = (loginUser: any) => {
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
                        {/*<AuthRoute*/}
                        {/*    path="/admin"*/}
                        {/*    role={['admin']}*/}
                        {/*    authUser={loginUser}*/}
                        {/*    component={ViewAdmin}*/}
                        {/*/>*/}
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

const mapStateToProps = ({authUser}: { authUser: any }) => {
    const {user: loginUser} = authUser;
    return {loginUser};
};
const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(App);
