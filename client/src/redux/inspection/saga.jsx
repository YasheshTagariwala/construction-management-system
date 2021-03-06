import {all, call, fork, put, takeEvery} from 'redux-saga/effects';
import ApiService from "../../services/api-service";
import {INSPECTION_ADD, INSPECTION_LIST, INSPECTION_UPDATE} from "../actions";
import {inspectionAddError, inspectionAddSuccess, inspectionListError, inspectionListSuccess, inspectionUpdateError, inspectionUpdateSuccess} from "./actions";

export function* watchInspectionList() {
    yield takeEvery(INSPECTION_LIST, getInspectionList);
}

const getInspectionListAsync = async (body) => {
    return await ApiService.callPost('/viewInspectorsInspection', body);
};

function* getInspectionList({payload}) {
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
    yield takeEvery(INSPECTION_ADD, getInspectionAdd);
}

const getInspectionAddAsync = async (body) => {
    return await ApiService.callPost('/createInspection', body);
};

function* getInspectionAdd({payload}) {
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
    yield takeEvery(INSPECTION_UPDATE, getInspectionUpdate);
}

const getInspectionUpdateAsync = async (body) => {
    return await ApiService.callPost('/updateInspection', body);
};

function* getInspectionUpdate({payload}) {
    const {history} = payload;
    try {
        yield call(getInspectionUpdateAsync, payload.body);
        yield put(inspectionUpdateSuccess());
        history.push('/inspector');
    } catch (error) {
        let err = error.response ? error.response.data.message : error.message
        yield put(inspectionUpdateError(err));
    }
}

export default function* rootSaga() {
    yield all([
        fork(watchInspectionList),
        fork(watchInspectionAdd),
        fork(watchInspectionUpdate),
    ])
}

