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

const InspectionForm = React.lazy(() =>
    import(/* webpackChunkName: "inspection-form" */ './inspection-form')
);

const Inspection = (props: any) => {
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
                        <Redirect to="/error"/>
                    </Switch>
                </div>
            </div>
        </Suspense>
    );
};

export default Inspection;
