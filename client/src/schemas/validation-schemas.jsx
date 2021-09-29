import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
    email: Yup.string().email('Enter a valid email').required("Please enter your email"),
    password: Yup.string().min(8).required("Please enter The password")
});

export const inspectionAddSchema = Yup.object().shape({
    InspectionTitle: Yup.string().required('Please enter Title'),
    InspectionTag: Yup.string().required('Please enter Tag'),
    InspectionDescription: Yup.string().required('Please enter Description '),
    ChecklistType: Yup.string().required('Please enter Checklist Type'),
    ChecklistSubType: Yup.string().required('Please enter Checklist Subtype'),
    InspectionProject: Yup.string().required('Please enter Project'),
    SubProject: Yup.string().required('Please enter Sub Project'),
    InspectionMember: Yup.string().required('Please enter Assigned To'),
})
