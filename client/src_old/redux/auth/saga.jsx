import {all, call, fork, put, takeEvery} from 'redux-saga/effects';
import {LOGIN_USER, LOGOUT_USER} from "../actions";
import ApiService from "../../services/api-service";
import {setSessionCookie} from "../../services/localstorage-service";
import {loginUserError, loginUserSuccess} from "./actions";

export function* watchLoginUser() {
    yield takeEvery(LOGIN_USER, loginWithEmailPassword);
}

const loginWithEmailPasswordAsync = async (email, password) => {
    return await ApiService.callPost('/auth/login', {email, password}, {'Skip-Headers': true});
};

function* loginWithEmailPassword({payload}) {
    const {email, password} = payload.user;
    const {history} = payload;
    try {
        const loginUser = yield call(loginWithEmailPasswordAsync, email, password);
        setSessionCookie(loginUser.data);
        yield put(loginUserSuccess(loginUser.data));
        history.push('/' + loginUser.data.role);
    } catch (error) {
        let err = error.response ? error.response.data.message : error.message
        yield put(loginUserError(err));
    }
}

export function* watchLogoutUser() {
    yield takeEvery(LOGOUT_USER, logout);
}

const logoutAsync = async (history) => {
    history.push('/')
};

function* logout({payload}) {
    const {history} = payload;
    try {
        localStorage.removeItem('construction');
        yield call(logoutAsync, history);
    } catch (error) {
    }
}

export default function* rootSaga() {
    yield all([
        fork(watchLoginUser),
        fork(watchLogoutUser)
    ])
}

