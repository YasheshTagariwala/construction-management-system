import {Field, Form as FormikForm, Formik} from 'formik'
import React, {useState} from "react";
import Loader from "../../components/loader";
import {inspectionAdd} from "../../redux/inspection/actions";
import {connect} from "react-redux";
import {inspectionAddSchema} from "../../schemas/validation-schemas";
import moment from "moment";

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
                created_at: moment().format('DD/MM/YYYY'),
                finished_at: "",
                type: [],
                sessions: [
                    {
                        name: "",
                        type: "OnField/Remote",
                        created_at: moment().format('DD/MM/YYYY'),
                        finished_at: "",
                        assigned_to: 'inspector',
                        checklist: [
                            {checklist}
                        ]
                    }
                ]
            }, props.history)
        }
    }

    const [selected, setSelected] = React.useState("");
    const [selected1, setSelected1] = React.useState("");
    const changeSelectOptionHandler = (event: any) => {
        setSelected(event.target.value);
    };
    const changeSelectOptionHandler1 = (event: any) => {
        setSelected1(event.target.value);
    };


    const StructureSubTypes = [
        "Plastering",
        "Concrete (RCC)"
    ];
    const StructurePlasteringChecklist = [
        {item: "Check for completeness of all hidden jobs like piping, conduiting, etc."},
        {item: "Check for grading of sand, Mix proportion."},
        {item: "Sample preparation for finish and its approval."},
        {item: "Hacking and cleaning the surface, removing loose particles, wetting the surface."},
        {item: "Checking of plaster thickness, plumb & even surface."},
        {item: "Check for grooves, openings, rounding off the corners, hollowness in plaster."},
        {item: "Checking for use of waterproofing compound , mix proportion(as applicable)."}
    ]
    const StructureConcreteChecklist = [
        {item: "Check for concrete slump as IS requirement."},
        {item: "Check for grade of concrete as per GFC drawing."},
        {item: "Check for levels and top finishes."},
        {item: "Check for material quality as per IS standards."},
        {item: "Check for presence of required dimensions of cubes for curing."},
        {item: "Check for formwork and dimensions are as per drawing."},
        {item: "Check for reinforcement as per GFC drawing and alignment."},
        {item: "Check for appropriate concrete mix and proportion of ingredients."}
    ]

    const ServicesSubTypes = [
        "San. Fixtures-PHE",
        "Electrical"
    ];
    const ServicesSanFixturesChecklist = [
        {item: "Check for material inspection and make."},
        {item: "Check completeness of finishing works w.r.t. line, WC level & position."},
        {item: "Check for leakage."},
        {item: "Check for pressure testing if applicable."},
        {item: "Check proper fixing of the sanitary fittings to give aesthetic appeal."},
        {item: "Check for dye test if applicable."},
        {item: "Check for mounting height as per GFC drawing."}
    ];
    const ServicesElectricalChecklist = [
        {item: "Check for location of fan junction box and light points as per GDC drawing."},
        {item: "Check for cleanliness once the conduiting work is over."},
        {item: "Check for if the Shaft is provided for Maintenance."},
        {item: "Check the mounting heights of DBs and switches are as per standards."},
        {item: "Check for separate circuits for lighting and power connections."},
        {item: "Check the makelist list of specified materials for junction boxes, lights, switches."},
        {item: "Check for different circuits for various purposes such as TV, refrigerator, internet connection etc."},
        {item: "Check if the location of distribution board and switches is as per approved GFC drawing."},
        {item: "Ensure correctness of lighting wire size and no. of wires as per the drawing in each conduit portion."},
        {item: "Ensure conduits are properly tied to reinforcement bars to prevent floating during concrete."}
    ];

    const FinishesSubTypes = [
        "Tile"
    ];
    const FinishesTileChecklist = [
        {item: "Check whether relevant drawings are available."},
        {item: "Check whether the quality, tile pattern and design as per the client requirement."},
        {item: "Check the border tile."},
        {item: "Check for corner beading."},
        {item: "Check for spacer / paper joint."},
        {item: "Check for tile drop."},
        {item: "Check for tile grout."},
        {item: "Check if the tile is soaked before laying."},
        {item: "Check for slope."}
    ];

    let type = null;
    let checklist = [{item: "Select type"}];
    let subTypesOptions: any = null;

    if (selected === "Structure") {
        type = StructureSubTypes;
    } else if (selected === "Services") {
        type = ServicesSubTypes;
    } else if (selected === "Finishes") {
        type = FinishesSubTypes;
    }

    if (selected1 === "Plastering") {
        checklist = StructurePlasteringChecklist;
    } else if (selected1 === "Concrete (RCC)") {
        checklist = StructureConcreteChecklist;
    } else if (selected1 === "San. Fixtures-PHE") {
        checklist = ServicesSanFixturesChecklist;
    } else if (selected1 === "Electrical") {
        checklist = ServicesElectricalChecklist;
    } else if (selected1 === "Tile") {
        checklist = FinishesTileChecklist;
    }

    if (type) {
        subTypesOptions = type.map((el) => <option key={el}>{el}</option>);
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
                                                   required
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
                                            <label className="form-label" htmlFor="Checklist Type">Checklist
                                                Type</label>
                                            <select className="form-select form-select-icon" id=""
                                                    name="ChecklistType"
                                                    onChange={changeSelectOptionHandler}
                                                    required aria-label="Checklist Type" aria-required="true">
                                                <option value="">Choose Checklist Type</option>
                                                <option>Structure</option>
                                                <option>Services</option>
                                                <option>Finishes</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="w-full md:w-1/3 px-3 mb-5">
                                        <div className="form-panel">
                                            <label className="form-label" htmlFor="Checklist Subtype">Checklist
                                                Subtype</label>
                                            <select className="form-select form-select-icon" id=""
                                                    name="ChecklistSubtype"
                                                    onChange={changeSelectOptionHandler1}
                                                    required aria-label="Checklist Subtype" aria-required="true">
                                                <option value="">Choose SubChecklist Type</option>
                                                {subTypesOptions}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="w-full px-3 mb-5">
                                        <div className="form-panel">
                                            <label className="form-label font-black"
                                                   htmlFor="Checklist Points">Checklist Points</label>

                                            {checklist.map((clist: any, index: number) => {
                                                return (
                                                    <React.Fragment key={index}>
                                                        <label className="form-label font-normal">
                                                            {clist.item}
                                                        </label>
                                                    </React.Fragment>
                                                )
                                            })}
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
                                            <label className="form-label" htmlFor="Sub Project">Sub Project</label>
                                            <select className="form-select form-select-icon" id=""
                                                    name="SubProject"
                                                    required aria-label="Sub Project" aria-required="true">
                                                <option value="">Choose SubProject</option>
                                                <option>SubProject-1</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="w-full md:w-1/3 px-3 mb-5">
                                        <div className="form-panel">
                                            <label className="form-label" htmlFor="Inspection Member">Assigned
                                                To</label>
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
