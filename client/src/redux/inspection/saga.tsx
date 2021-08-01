import {all, call, fork, put, takeEvery} from 'redux-saga/effects';
import ApiService from "../../services/api-service";
import {INSPECTION_LIST} from "../actions";
import {inspectionListError, inspectionListSuccess} from "./actions";

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

export default function* rootSaga() {
    yield all([
        fork(watchInspectionList),
    ])
}

