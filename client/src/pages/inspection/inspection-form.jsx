import {Field, Form as FormikForm, Formik} from 'formik'
import React, {useState} from "react";
import Loader from "../../components/loader";
import {inspectionAdd} from "../../redux/inspection/actions";
import {connect} from "react-redux";
import {inspectionAddSchema} from "../../schemas/validation-schemas";
import moment from "moment";

function InspectionForm(props) {

    const [formFields] = useState({
        InspectionTitle: '',
        InspectionTag: '',
        InspectionDescription: '',
        InspectionProject: '',
        InspectionMember: '',
        images: []
    });

    let images = [];

    const onInspectionSave = (values) => {
        if (!props.loading) {
            const fd = new FormData();
            fd.append('name', values.InspectionTitle);
            fd.append('created_by', 'contractor');
            fd.append('created_at', moment().format('DD/MM/YYYY'));
            fd.append('finished_at', '');
            fd.append('type', JSON.stringify([]));
            fd.append('sessions', JSON.stringify([
                {
                    name: moment().format('DD/MM/YYYY HH:mm A'),
                    type: "OnField/Remote",
                    created_at: moment().format('DD/MM/YYYY'),
                    finished_at: "",
                    assigned_to: 'inspector',
                    checklist,
                    notes: values.InspectionDescription
                }
            ]));
            images.forEach(img => {
                fd.append('images', img);
            })
            props.inspectionAdd(fd, props.history)
        }
    }

    const [selected, setSelected] = React.useState("");
    const [selected1, setSelected1] = React.useState("");
    const changeSelectOptionHandler = (event) => {
        setSelected(event.target.value);
    };
    const changeSelectOptionHandler1 = (event) => {
        setSelected1(event.target.value);
    };


    const StructureSubTypes = [
        "Plastering",
        "Concrete (RCC)"
    ];
    const StructurePlasteringChecklist = [
        {item: "Check for completeness of all hidden jobs like piping, conduiting, etc.", checked: false},
        {item: "Check for grading of sand, Mix proportion.", checked: false},
        {item: "Sample preparation for finish and its approval.", checked: false},
        {item: "Hacking and cleaning the surface, removing loose particles, wetting the surface.", checked: false},
        {item: "Checking of plaster thickness, plumb & even surface.", checked: false},
        {item: "Check for grooves, openings, rounding off the corners, hollowness in plaster.", checked: false},
        {item: "Checking for use of waterproofing compound , mix proportion(as applicable).", checked: false}
    ]
    const StructureConcreteChecklist = [
        {item: "Check for concrete slump as IS requirement.", checked: false},
        {item: "Check for grade of concrete as per GFC drawing.", checked: false},
        {item: "Check for levels and top finishes.", checked: false},
        {item: "Check for material quality as per IS standards.", checked: false},
        {item: "Check for presence of required dimensions of cubes for curing.", checked: false},
        {item: "Check for formwork and dimensions are as per drawing.", checked: false},
        {item: "Check for reinforcement as per GFC drawing and alignment.", checked: false},
        {item: "Check for appropriate concrete mix and proportion of ingredients.", checked: false}
    ]

    const ServicesSubTypes = [
        "San. Fixtures-PHE",
        "Electrical"
    ];
    const ServicesSanFixturesChecklist = [
        {item: "Check for material inspection and make.", checked: false},
        {item: "Check completeness of finishing works w.r.t. line, WC level & position.", checked: false},
        {item: "Check for leakage.", checked: false},
        {item: "Check for pressure testing if applicable.", checked: false},
        {item: "Check proper fixing of the sanitary fittings to give aesthetic appeal.", checked: false},
        {item: "Check for dye test if applicable.", checked: false},
        {item: "Check for mounting height as per GFC drawing.", checked: false}
    ];
    const ServicesElectricalChecklist = [
        {item: "Check for location of fan junction box and light points as per GDC drawing.", checked: false},
        {item: "Check for cleanliness once the conduiting work is over.", checked: false},
        {item: "Check for if the Shaft is provided for Maintenance.", checked: false},
        {item: "Check the mounting heights of DBs and switches are as per standards.", checked: false},
        {item: "Check for separate circuits for lighting and power connections.", checked: false},
        {item: "Check the makelist list of specified materials for junction boxes, lights, switches.", checked: false},
        {
            item: "Check for different circuits for various purposes such as TV, refrigerator, internet connection etc.",
            checked: false
        },
        {
            item: "Check if the location of distribution board and switches is as per approved GFC drawing.",
            checked: false
        },
        {
            item: "Ensure correctness of lighting wire size and no. of wires as per the drawing in each conduit portion.",
            checked: false
        },
        {
            item: "Ensure conduits are properly tied to reinforcement bars to prevent floating during concrete.",
            checked: false
        }
    ];

    const FinishesSubTypes = [
        "Tile"
    ];
    const FinishesTileChecklist = [
        {item: "Check whether relevant drawings are available.", checked: false},
        {item: "Check whether the quality, tile pattern and design as per the client requirement.", checked: false},
        {item: "Check the border tile.", checked: false},
        {item: "Check for corner beading.", checked: false},
        {item: "Check for spacer / paper joint.", checked: false},
        {item: "Check for tile drop.", checked: false},
        {item: "Check for tile grout.", checked: false},
        {item: "Check if the tile is soaked before laying.", checked: false},
        {item: "Check for slope.", checked: false}
    ];

    let type = null;
    let checklist = [{item: "Select type"}];
    let subTypesOptions = null;

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
                                            <Field className="form-input" rows={3} id="" name="InspectionDescription"
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

                                            {checklist.map((clist, index) => {
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
                                    <div className="w-full md:w-1/3 px-3 mb-5">
                                        <div className="form-panel">
                                            <label className="form-label" htmlFor="Inspection file">Images</label>
                                            <input className="form-select" type="file" id="" accept="image/*" name="Inspection file"
                                                   aria-label="Inspection file" aria-required="true"
                                                   onChange={(ev) => {
                                                       images = [];
                                                       if (ev.target.files) {
                                                           for (let i = 0; i < ev.target.files.length; i++) {
                                                               images.push(ev.target.files[i]);
                                                           }
                                                       }
                                                   }}
                                                   multiple/>
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

const mapStateToProps = ({inspectionsReducer}) => {
    const {loading, error, success} = inspectionsReducer
    return {loading, error, success}
}

const mapActionsToProps = {inspectionAdd}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(InspectionForm)
