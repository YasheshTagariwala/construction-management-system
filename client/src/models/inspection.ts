export interface Inspection {
    name: string;
    sub_project: any;
    created_by: string;
    created_at: string;
    finished_at: string;
    type: any;
    sessions: Session[];
}

export interface Session {
    name: string;
    assigned_to: string;
    created_at: string;
    finished_at: string;
    type: string;
    checklist: any
    images: string;
    start_end: any;
    notes: string;
    signature: string;
}