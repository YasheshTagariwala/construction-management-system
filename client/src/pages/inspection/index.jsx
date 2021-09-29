import React, {Suspense} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import SideBar from "../../layouts/sidebar";
import Header from "../../layouts/header";
import {Container} from "reactstrap";
import Footer from "../../layouts/footer";

const Dashboard = React.lazy(() =>
    import(/* webpackChunkName: "dashboard" */ './dashboard')
);

const InspectionKanban = React.lazy(() =>
    import(/* webpackChunkName: "inspection-kanban" */ './inspection-kanban')
);

const InspectionForm = React.lazy(() =>
    import(/* webpackChunkName: "inspection-form" */ './inspection-form')
);

const InspectionDetails = React.lazy(() =>
    import(/* webpackChunkName: "inspection-details" */ './inspection-details')
);

const Inspection = (props) => {
    return (
        <Suspense fallback={<div className="loading"/>}>
            <div id="wrapper">
                <SideBar user={props.authUser}/>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <Header/>
                        <Container fluid>
                            <Switch>
                                <Redirect exact from={`${props.match.url}/`} to={`${props.match.url}/dashboard`}/>
                                <Route
                                    path={`${props.match.url}/dashboard`}
                                    render={props => <Dashboard {...props} />}
                                />
                                <Route
                                    path={`${props.match.url}/inspection/add`}
                                    render={props => <InspectionForm {...props} />}
                                />
                                <Route
                                    path={`${props.match.url}/inspection-kanban/details`}
                                    render={props => <InspectionDetails {...props} />}
                                />
                                <Route
                                    path={`${props.match.url}/inspection`}
                                    render={props => <InspectionKanban {...props} />}
                                />
                                <Redirect to="/error"/>
                            </Switch>
                        </Container>
                    </div>
                    <Footer/>
                </div>
            </div>
        </Suspense>
    );
};

export default Inspection;
