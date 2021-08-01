import {
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

