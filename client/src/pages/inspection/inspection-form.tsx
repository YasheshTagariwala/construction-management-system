import {Field, Form as FormikForm, Formik} from 'formik'
import React, {useState} from "react";
import Loader from "../../components/loader";
import {inspectionAdd} from "../../redux/inspection/actions";
import {connect} from "react-redux";
import {inspectionAddSchema} from "../../schemas/validation-schemas";

function InspectionForm(props: any) {

    const [formFields] = useState({
        InspectionTitle: '',
        InspectionTag: '',
        InspectionDescription: '',
        InspectionProject: '',
        InspectionMember: ''

    });

    const onInspectionSave = (values: any) => {
        if (!props.loading) {
            props.inspectionAdd({
                name: values.InspectionTitle,
                created_by: "contractor",
                created_at: "",
                finished_at: "",
                type: [],
                sessions: [
                    {
                        name: "",
                        type: "OnField",
                        created_at: "",
                        finished_at: "",
                        assigned_to: 'inspector',
                        checklist: [
                            {
                                "Point1": "Issue1"
                            }
                        ]
                    }
                ]
            }, props.history)
        }
    }

    return (
        <main className="h-full pb-16 overflow-y-auto">
            {props.loading && <Loader/>}
            <div className="container px-6 mt-10 mx-auto grid">
                {/*Card*/}
                <div className="p-10 bg-white rounded-lg shadow-xl">
                    <h2 className="font-agenor-regular font-sans text-xl md:text-3xl tracking-wide mb-5 px-3">Add
                        Inspection</h2>

                    <Formik initialValues={formFields} validationSchema={inspectionAddSchema}
                            onSubmit={onInspectionSave}>

                        {({errors, touched}) => (

                            <FormikForm className="add-inspection">
                                <div className="flex flex-wrap">
                                    <div className="w-full md:w-1/2 px-3 mb-5">
                                        <div className="form-panel">
                                            <label className="form-label" htmlFor="Inspection Title">Title</label>
                                            <Field className="form-input" name="InspectionTitle" type="text"
                                                   placeholder="Title"/>
                                            {errors.InspectionTitle && touched.InspectionTitle && (
                                                <div
                                                    className="block text-red-800">{errors.InspectionTitle}</div>)}
                                        </div>
                                    </div>
                                    <div className="w-full md:w-1/2 px-3 mb-5">
                                        <div className="form-panel">
                                            <label className="form-label" htmlFor="Inspection Tag">Tag</label>
                                            <input className="form-input" id="" name="InspectionTag" type="text"
                                                   required
                                                   placeholder="Tag" aria-label="Inspection Tag" aria-required="true"/>
                                        </div>
                                    </div>
                                    <div className="w-full px-3 mb-5">
                                        <div className="form-panel">
                                            <label className="form-label"
                                                   htmlFor="Inspection Description">Description</label>
                                            <textarea className="form-input" rows={3} id="" name="InspectionDescription"
                                                      required placeholder="Description"
                                                      aria-label="Inspection Description" aria-required="true"/>
                                        </div>
                                    </div>
                                    <div className="w-full md:w-1/3 px-3 mb-5">
                                        <div className="form-panel">
                                            <label className="form-label" htmlFor="Inspection Project">Project</label>
                                            <select className="form-select form-select-icon" id=""
                                                    name="InspectionProject"
                                                    required aria-label="Inspection Project" aria-required="true">
                                                <option value="">Choose Project</option>
                                                <option>Project-1</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="w-full md:w-1/3 px-3 mb-5">
                                        <div className="form-panel">
                                            <label className="form-label" htmlFor="Inspection Member">Member</label>
                                            <select className="form-select form-select-icon" id=""
                                                    name="InspectionMember"
                                                    required aria-label="Inspection Member" aria-required="true">
                                                <option value="">Choose Member</option>
                                                <option>Inspector</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="button blue-btn">
                                    submit
                                </button>
                            </FormikForm>
                        )}
                    </Formik>
                </div>
            </div>
        </main>
    )
}

const mapStateToProps = ({inspectionsReducer}: { inspectionsReducer: any }) => {
    const {loading, error, success} = inspectionsReducer
    return {loading, error, success}
}

const mapActionsToProps = {inspectionAdd}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(InspectionForm)
