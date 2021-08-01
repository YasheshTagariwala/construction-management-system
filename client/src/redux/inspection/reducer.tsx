import {INSPECTION_LIST, INSPECTION_LIST_ERROR, INSPECTION_LIST_SUCCESS} from "../actions";

const INIT_STATE = {
    inspections: [],
    inspection: null,
    loading: false,
    error: '',
    success: ''
}

const inspectionReducer = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case INSPECTION_LIST:
            return {...state, loading: true, error: '', success: '', inspections: [], inspection: null};
        case INSPECTION_LIST_SUCCESS:
            return {...state, loading: false, inspections: action.payload, error: '', success: ''};
        case INSPECTION_LIST_ERROR:
            return {...state, loading: false, inspections: [], error: action.payload.message, success: ''};
        default:
            return {...state};
    }
}

export default inspectionReducer;