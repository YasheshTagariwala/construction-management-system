import {all, call, fork, put, takeEvery} from 'redux-saga/effects';
import {LOGIN_USER, LOGOUT_USER} from "../actions";
import ApiService from "../../services/api-service";
import {setSessionCookie} from "../../services/localstorage-service";
import {loginUserError, loginUserSuccess} from "./actions";

interface Parameters {
    payload: any
}

export function* watchLoginUser() {
    yield takeEvery<any>(LOGIN_USER, loginWithEmailPassword);
}

const loginWithEmailPasswordAsync = async (email: string, password: string) => {
    return await ApiService.callPost('/auth/login', {email, password});
};

function* loginWithEmailPassword({payload}: Parameters): any {
    const {email, password} = payload.user;
    const {history} = payload;
    try {
        const loginUser = yield call(loginWithEmailPasswordAsync, email, password);
        setSessionCookie(loginUser.data);
        yield put(loginUserSuccess(loginUser.data));
        history.push('/');
    } catch (error) {
        let err = error.response ? error.response.data.message : error.message
        yield put(loginUserError(err));
    }
}

export function* watchLogoutUser() {
    yield takeEvery<any>(LOGOUT_USER, logout);
}

const logoutAsync = async (history: any) => {
    history.push('/')
};

function* logout({payload}: Parameters) {
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

