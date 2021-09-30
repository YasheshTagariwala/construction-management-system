import {
    INSPECTION_ADD, INSPECTION_ADD_ERROR,
    INSPECTION_ADD_SUCCESS, INSPECTION_DETAIL, INSPECTION_DETAIL_ERROR, INSPECTION_DETAIL_SUCCESS,
    INSPECTION_LIST,
    INSPECTION_LIST_ERROR,
    INSPECTION_LIST_SUCCESS,
    INSPECTION_UPDATE,
    INSPECTION_UPDATE_ERROR,
    INSPECTION_UPDATE_SUCCESS
} from "../actions";

const INIT_STATE = {
    inspections: [],
    inspection: null,
    loading: false,
    error: '',
    success: ''
}

const inspectionReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case INSPECTION_LIST:
            return {...state, loading: true, error: '', success: '', inspections: [], inspection: null};
        case INSPECTION_LIST_SUCCESS:
            return {...state, loading: false, inspections: action.payload, error: '', success: ''};
        case INSPECTION_LIST_ERROR:
            return {...state, loading: false, inspections: [], error: action.payload.message, success: ''};
        case INSPECTION_ADD:
            return {...state, loading: true, error: '', success: ''};
        case INSPECTION_ADD_SUCCESS:
            return {...state, loading: false, error: '', success: 'Inspection Created successfully'};
        case INSPECTION_ADD_ERROR:
            return {...state, loading: false, error: action.payload.message, success: ''};
        case INSPECTION_UPDATE:
            return {...state, loading: true, error: '', success: ''};
        case INSPECTION_UPDATE_SUCCESS:
            return {...state, loading: false, error: '', success: 'Updated successfully'};
        case INSPECTION_UPDATE_ERROR:
            return {...state, loading: false, error: action.payload.message, success: ''};
        case INSPECTION_DETAIL:
            return {...state, loading: true, inspection: null, error: '', success: ''};
        case INSPECTION_DETAIL_SUCCESS:
            return {...state, loading: false, inspection: action.payload.inspection, error: '', success: ''};
        case INSPECTION_DETAIL_ERROR:
            return {...state, loading: false, inspection: null, error: action.payload.message, success: ''};
        default:
            return {...state};
    }
}

export default inspectionReducer;
