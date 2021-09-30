import React, {Suspense, lazy} from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/scss/bootstrap.scss';
import './assets/css/all.min.css';
import './assets/css/main.scss';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {configureStore} from "./redux/store";

const App = lazy(() => import(/* webpackChunkName: "App" */'./App' ));

ReactDOM.render(
    <Provider store={configureStore({})}>
        <Suspense fallback={<div className="loading"/>}>
            <App/>
        </Suspense>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
