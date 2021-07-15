import createSagaMiddleware from "redux-saga";
import {applyMiddleware, compose, createStore} from "redux";
import reducers from './reducers';
import sagas from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

export function configureStore(initialState: any) {
    const store = createStore(
        reducers,
        initialState,
        compose(applyMiddleware(...middlewares))
    )

    sagaMiddleware.run(sagas);

    // @ts-ignore
    if (module.hot) {
        // @ts-ignore
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers');
            store.replaceReducer(nextRootReducer);
        })
    }
    return store
}