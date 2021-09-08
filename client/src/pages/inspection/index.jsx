import React, {Suspense, useState} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import SideBar from "../../layouts/sidebar";
import Header from "../../layouts/header";

const Dashboard = React.lazy(() =>
    import(/* webpackChunkName: "dashboard" */ './dashboard')
);

const InspectionList = React.lazy(() =>
    import(/* webpackChunkName: "inspection-list" */ './inspection-list')
);

const InspectionKanban = React.lazy(() =>
    import(/* webpackChunkName: "inspection-kanban" */ './inspection-kanban')
);

const InspectionForm = React.lazy(() =>
    import(/* webpackChunkName: "inspection-form" */ './inspection-form')
);

const Inspection = (props) => {
    const [sideBarOpen, setSideBarOpen] = useState(false);
    return (
        <Suspense fallback={<div className="loading"/>}>
            <div className="flex h-screen bg-gray-50">
                <div onClick={() => setSideBarOpen(!sideBarOpen)}
                     className={`${sideBarOpen ? 'block' : 'hidden'} fixed z-20 inset-0 bg-white opacity-50 transition-opacity lg:hidden block`}/>
                <SideBar sideBarOpen={sideBarOpen} user={props.authUser}/>
                <div className="flex flex-col flex-1">
                    <Header setSideBarOpen={setSideBarOpen} sideBarOpen={sideBarOpen}/>
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
                            path={`${props.match.url}/inspection`}
                            render={props => <InspectionList {...props} />}
                        />
                        <Route
                            path={`${props.match.url}/inspection-kanban`}
                            render={props => <InspectionKanban {...props} />}
                        />
                        {/*<Route*/}
                        {/*    path={`${props.match.url}/inspection-kanban`}*/}
                        {/*    authUser={props.loginUser}*/}
                        {/*    component={InspectionKanban}/>}*/}
                        {/*/>*/}
                        <Redirect to="/error"/>
                    </Switch>
                </div>
            </div>
        </Suspense>
    );
};

export default Inspection;
