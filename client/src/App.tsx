import React, {Suspense, useState} from 'react';
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

const ViewAuth = React.lazy(() =>
    import(/* webpackChunkName: "views-auth" */ './pages/auth')
);
const ViewError = React.lazy(() =>
    import(/* webpackChunkName: "views-error" */ './pages/error')
);


function App() {
    const [loginUser, setLoginUser] = useState(null);

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

export default App;
