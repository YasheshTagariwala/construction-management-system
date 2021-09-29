import {Field, Form as FormikForm, Formik} from 'formik'
import React, {useState} from "react";
import Loader from "../../components/loader";
import {inspectionAdd} from "../../redux/inspection/actions";
import {connect} from "react-redux";
import {inspectionAddSchema} from "../../schemas/validation-schemas";
import moment from "moment";
import {Button, Card, CardBody, Col, FormGroup, Label, Row} from "reactstrap";

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
        <React.Fragment>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h3 className="mb-0 font-weight-normal">Add Inspection</h3>
            </div>
            {props.loading && <Loader/>}
            <Row className="mb-3">
                <Col md={12} className="mb-4">
                    <Card>
                        <CardBody>
                            <Formik initialValues={formFields} validationSchema={inspectionAddSchema}
                                    onSubmit={onInspectionSave}>
                                {({errors, touched}) => (
                                    <FormikForm>
                                        <Row>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="Inspection Title">Title</Label>
                                                    <Field className="form-control" name="InspectionTitle" type="text"
                                                           required
                                                           placeholder="Title"/>
                                                    {errors.InspectionTitle && touched.InspectionTitle && (
                                                        <div
                                                            className="block text-red-800">{errors.InspectionTitle}</div>)}
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="Inspection Tag">Tag</Label>
                                                    <Field className="form-control" name="InspectionTag" type="text"
                                                           required
                                                           placeholder="Tag"/>
                                                    {errors.InspectionTag && touched.InspectionTag && (
                                                        <div
                                                            className="block text-red-800">{errors.InspectionTag}</div>)}
                                                </FormGroup>
                                            </Col>
                                            <Col md={12}>
                                                <FormGroup>
                                                    <Label for="Inspection Description">Description</Label>
                                                    <Field className="form-control" rows={3}
                                                           name="InspectionDescription" type="text"
                                                           required
                                                           placeholder="Description"/>
                                                    {errors.InspectionTag && touched.InspectionTag && (
                                                        <div
                                                            className="block text-red-800">{errors.InspectionTag}</div>)}
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="Checklist Type">Checklist Type</Label>
                                                    <select className="custom-select d-block w-100 form-control"
                                                            name="ChecklistType"
                                                            onChange={changeSelectOptionHandler}
                                                            required>
                                                        <option value="">Choose Checklist Type</option>
                                                        <option>Structure</option>
                                                        <option>Services</option>
                                                        <option>Finishes</option>
                                                    </select>
                                                    {errors.InspectionTag && touched.InspectionTag && (
                                                        <div
                                                            className="block text-red-800">{errors.InspectionTag}</div>)}
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="Checklist Type">Checklist Subtype</Label>
                                                    <select className="custom-select d-block w-100 form-control"
                                                            name="ChecklistSubType"
                                                            onChange={changeSelectOptionHandler1}
                                                            required>
                                                        <option value="">Choose SubChecklist Type</option>
                                                        {subTypesOptions}
                                                    </select>
                                                    {errors.InspectionTag && touched.InspectionTag && (
                                                        <div
                                                            className="block text-red-800">{errors.InspectionTag}</div>)}
                                                </FormGroup>
                                            </Col>
                                            <Col md={12}>
                                                <FormGroup>
                                                    <Label for="Checklist Type">Checklist Points</Label>
                                                    {checklist.map((clist, index) => {
                                                        return (
                                                            <React.Fragment key={index}>
                                                                <Label className="form-label">
                                                                    {clist.item}
                                                                </Label>
                                                            </React.Fragment>
                                                        )
                                                    })}
                                                    {errors.InspectionTag && touched.InspectionTag && (
                                                        <div
                                                            className="block text-red-800">{errors.InspectionTag}</div>)}
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="Inspection Project">Project</Label>
                                                    <select className="custom-select d-block w-100 form-control" id=""
                                                            name="InspectionProject"
                                                            required>
                                                        <option value="">Choose Project</option>
                                                        <option>Project-1</option>
                                                    </select>
                                                    {errors.InspectionTag && touched.InspectionTag && (
                                                        <div
                                                            className="block text-red-800">{errors.InspectionTag}</div>)}
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="Sub Project">Sub Project</Label>
                                                    <select className="custom-select d-block w-100 form-control" id=""
                                                            name="SubProject"
                                                            required>
                                                        <option value="">Choose SubProject</option>
                                                        <option>SubProject-1</option>
                                                    </select>
                                                    {errors.InspectionTag && touched.InspectionTag && (
                                                        <div
                                                            className="block text-red-800">{errors.InspectionTag}</div>)}
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="Inspection Member">Assigned To</Label>
                                                    <select className="custom-select d-block w-100 form-control" id=""
                                                            name="InspectionMember"
                                                            required>
                                                        <option value="">Choose Member</option>
                                                        <option>Inspector</option>
                                                    </select>
                                                    {errors.InspectionTag && touched.InspectionTag && (
                                                        <div
                                                            className="block text-red-800">{errors.InspectionTag}</div>)}
                                                </FormGroup>
                                            </Col>
                                            <Col md={12}>
                                                <FormGroup>
                                                    <Label for="Inspection file">Images</Label>
                                                    <input className="form-control" type="file" style={{
                                                        height: '60px'
                                                    }} id="" accept="image/*"
                                                           name="Inspection file"
                                                           onChange={(ev) => {
                                                               images = [];
                                                               if (ev.target.files) {
                                                                   for (let i = 0; i < ev.target.files.length; i++) {
                                                                       images.push(ev.target.files[i]);
                                                                   }
                                                               }
                                                           }}
                                                           multiple/>
                                                    {errors.InspectionTag && touched.InspectionTag && (
                                                        <div
                                                            className="block text-red-800">{errors.InspectionTag}</div>)}
                                                </FormGroup>
                                            </Col>

                                            <div className="col-12 text-right mt-4">
                                                <Button type="submit" className="primary-btn form-btn">Submit</Button>
                                            </div>
                                        </Row>
                                    </FormikForm>
                                )}
                            </Formik>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
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
