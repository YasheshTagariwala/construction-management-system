import {all} from 'redux-saga/effects';
import authSagas from './auth/saga';
import inspectionSagas from './inspection/saga';

export default function* rootSaga() {
    yield all([
        authSagas(),
        inspectionSagas(),
    ]);
}