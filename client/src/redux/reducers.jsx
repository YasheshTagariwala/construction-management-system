import {combineReducers} from "redux";
import authUser from './auth/reducer';
import inspectionsReducer from "./inspection/reducer";

const reducers = combineReducers({
    authUser,
    inspectionsReducer
})

export default reducers;