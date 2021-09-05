import {
    INSPECTION_ADD, INSPECTION_ADD_ERROR, INSPECTION_ADD_SUCCESS,
    INSPECTION_LIST, INSPECTION_LIST_ERROR,
    INSPECTION_LIST_SUCCESS, INSPECTION_UPDATE, INSPECTION_UPDATE_ERROR, INSPECTION_UPDATE_SUCCESS,
} from "../actions";

export const inspectionList = (body)=> ({
    type: INSPECTION_LIST,
    payload: {body}
})

export const inspectionListSuccess = (inspections) => ({
    type: INSPECTION_LIST_SUCCESS,
    payload: inspections
});
export const inspectionListError = (message)=> ({
    type: INSPECTION_LIST_ERROR,
    payload: {message}
});

export const inspectionAdd = (body, history)=> ({
    type: INSPECTION_ADD,
    payload: {body, history}
})

export const inspectionAddSuccess = () => ({
    type: INSPECTION_ADD_SUCCESS
});
export const inspectionAddError = (message)=> ({
    type: INSPECTION_ADD_ERROR,
    payload: {message}
});

export const inspectionUpdate = (body, history)=> ({
    type: INSPECTION_UPDATE,
    payload: {body, history}
})

export const inspectionUpdateSuccess = () => ({
    type: INSPECTION_UPDATE_SUCCESS
});
export const inspectionUpdateError = (message)=> ({
    type: INSPECTION_UPDATE_ERROR,
    payload: {message}
});
