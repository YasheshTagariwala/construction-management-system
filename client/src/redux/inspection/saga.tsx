import {all, call, fork, put, takeEvery} from 'redux-saga/effects';
import ApiService from "../../services/api-service";
import {INSPECTION_ADD, INSPECTION_LIST} from "../actions";
import {inspectionAddError, inspectionAddSuccess, inspectionListError, inspectionListSuccess} from "./actions";

interface Parameters {
    payload: any
}

export function* watchInspectionList() {
    yield takeEvery<any>(INSPECTION_LIST, getInspectionList);
}

const getInspectionListAsync = async (body: any) => {
    return await ApiService.callPost('/viewInspectorsInspection', body);
};

function* getInspectionList({payload}: Parameters): any {
    try {
        const inspectionList = yield call(getInspectionListAsync, payload.body);
        yield put(inspectionListSuccess(inspectionList.data));
    } catch (error) {
        let err = error.response ? error.response.data.message : error.message
        yield put(inspectionListError(err));
    }
}

//INSPECTION ADD
export function* watchInspectionAdd() {
    yield takeEvery<any>(INSPECTION_ADD, getInspectionAdd);
}

const getInspectionAddAsync = async (body: any) => {
    return await ApiService.callPost('/createInspection', body);
};

function* getInspectionAdd({payload}: Parameters): any {
    const {history} = payload;
    try {
        yield call(getInspectionAddAsync, payload.body);
        yield put(inspectionAddSuccess());
        history.push('/inspector');
    } catch (error) {
        let err = error.response ? error.response.data.message : error.message
        yield put(inspectionAddError(err));
    }
}

export default function* rootSaga() {
    yield all([
        fork(watchInspectionList),
        fork(watchInspectionAdd),
    ])
}

