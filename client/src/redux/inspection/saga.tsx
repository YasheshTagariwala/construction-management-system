import {all, call, fork, put, takeEvery} from 'redux-saga/effects';
import ApiService from "../../services/api-service";
import {INSPECTION_ADD, INSPECTION_LIST, INSPECTION_UPDATE} from "../actions";
import {inspectionAddError, inspectionAddSuccess, inspectionListError, inspectionListSuccess, inspectionUpdateError, inspectionUpdateSuccess} from "./actions";

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

//INSPECTION UPDATE
export function* watchInspectionUpdate() {
    yield takeEvery<any>(INSPECTION_UPDATE, getInspectionUpdate);
}

const getInspectionUpdateAsync = async (body: any) => {
    return await ApiService.callPost('/updateInspection', body);
};

function* getInspectionUpdate({payload}: Parameters): any {
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
        fork(watchInspectionUpdate),
    ])
}

