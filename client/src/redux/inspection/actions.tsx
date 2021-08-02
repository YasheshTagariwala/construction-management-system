import {
    INSPECTION_ADD, INSPECTION_ADD_ERROR, INSPECTION_ADD_SUCCESS,
    INSPECTION_LIST, INSPECTION_LIST_ERROR,
    INSPECTION_LIST_SUCCESS,
} from "../actions";
import {Inspection} from "../../models/inspection";

export const inspectionList = (body: any) => ({
    type: INSPECTION_LIST,
    payload: {body}
})

export const inspectionListSuccess = (inspections: Inspection[]) => ({
    type: INSPECTION_LIST_SUCCESS,
    payload: inspections
});
export const inspectionListError = (message: string) => ({
    type: INSPECTION_LIST_ERROR,
    payload: {message}
});

export const inspectionAdd = (body: any, history: any) => ({
    type: INSPECTION_ADD,
    payload: {body, history}
})

export const inspectionAddSuccess = () => ({
    type: INSPECTION_ADD_SUCCESS
});
export const inspectionAddError = (message: string) => ({
    type: INSPECTION_ADD_ERROR,
    payload: {message}
});
