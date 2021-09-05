import {getSessionCookie} from "../../services/localstorage-service";
import {LOGIN_USER, LOGIN_USER_ERROR, LOGIN_USER_SUCCESS, LOGOUT_USER} from "../actions";

const INIT_STATE = {
    user: getSessionCookie() || null,
    loading: false,
    error: '',
    success: ''
}

const authReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {...state, loading: true, error: '', success: ''};
        case LOGIN_USER_SUCCESS:
            return {...state, loading: false, user: action.payload, error: '', success: ''};
        case LOGIN_USER_ERROR:
            return {...state, loading: false, user: '', error: action.payload.message, success: ''};
        case LOGOUT_USER:
            return {...state, user: null, error: '', success: ''};
        default:
            return {...state};
    }
}

export default authReducer;
