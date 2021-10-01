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
        SubProject: '',
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
        {item: "Check for completeness of all hidden jobs like piping, conduiting, etc.", checked: false, statusChecked: ''},
        {item: "Check for grading of sand, Mix proportion.", checked: false, statusChecked: ''},
        {item: "Sample preparation for finish and its approval.", checked: false, statusChecked: ''},
        {item: "Hacking and cleaning the surface, removing loose particles, wetting the surface.", checked: false, statusChecked: ''},
        {item: "Checking of plaster thickness, plumb & even surface.", checked: false, statusChecked: ''},
        {item: "Check for grooves, openings, rounding off the corners, hollowness in plaster.", checked: false, statusChecked: ''},
        {item: "Checking for use of waterproofing compound , mix proportion(as applicable).", checked: false, statusChecked: ''}
    ]
    const StructureConcreteChecklist = [
        {item: "Check for concrete slump as IS requirement.", checked: false, statusChecked: ''},
        {item: "Check for grade of concrete as per GFC drawing.", checked: false, statusChecked: ''},
        {item: "Check for levels and top finishes.", checked: false, statusChecked: ''},
        {item: "Check for material quality as per IS standards.", checked: false, statusChecked: ''},
        {item: "Check for presence of required dimensions of cubes for curing.", checked: false, statusChecked: ''},
        {item: "Check for formwork and dimensions are as per drawing.", checked: false, statusChecked: ''},
        {item: "Check for reinforcement as per GFC drawing and alignment.", checked: false, statusChecked: ''},
        {item: "Check for appropriate concrete mix and proportion of ingredients.", checked: false, statusChecked: ''}
    ]

    const ServicesSubTypes = [
        "San. Fixtures-PHE",
        "Electrical"
    ];
    const ServicesSanFixturesChecklist = [
        {item: "Check for material inspection and make.", checked: false, statusChecked: ''},
        {item: "Check completeness of finishing works w.r.t. line, WC level & position.", checked: false, statusChecked: ''},
        {item: "Check for leakage.", checked: false, statusChecked: ''},
        {item: "Check for pressure testing if applicable.", checked: false, statusChecked: ''},
        {item: "Check proper fixing of the sanitary fittings to give aesthetic appeal.", checked: false, statusChecked: ''},
        {item: "Check for dye test if applicable.", checked: false, statusChecked: ''},
        {item: "Check for mounting height as per GFC drawing.", checked: false, statusChecked: ''}
    ];
    const ServicesElectricalChecklist = [
        {item: "Check for location of fan junction box and light points as per GDC drawing.", checked: false, statusChecked: ''},
        {item: "Check for cleanliness once the conduiting work is over.", checked: false, statusChecked: ''},
        {item: "Check for if the Shaft is provided for Maintenance.", checked: false, statusChecked: ''},
        {item: "Check the mounting heights of DBs and switches are as per standards.", checked: false, statusChecked: ''},
        {item: "Check for separate circuits for lighting and power connections.", checked: false, statusChecked: ''},
        {item: "Check the makelist list of specified materials for junction boxes, lights, switches.", checked: false, statusChecked: ''},
        {
            item: "Check for different circuits for various purposes such as TV, refrigerator, internet connection etc.",
            checked: false,
            statusChecked: ''
        },
        {
            item: "Check if the location of distribution board and switches is as per approved GFC drawing.",
            checked: false,
            statusChecked: ''
        },
        {
            item: "Ensure correctness of lighting wire size and no. of wires as per the drawing in each conduit portion.",
            checked: false,
            statusChecked: ''
        },
        {
            item: "Ensure conduits are properly tied to reinforcement bars to prevent floating during concrete.",
            checked: false,
            statusChecked: ''
        }
    ];

    const FinishesSubTypes = [
        "Tile"
    ];
    const FinishesTileChecklist = [
        {item: "Check whether relevant drawings are available.", checked: false, statusChecked: ''},
        {item: "Check whether the quality, tile pattern and design as per the client requirement.", checked: false, statusChecked: ''},
        {item: "Check the border tile.", checked: false, statusChecked: ''},
        {item: "Check for corner beading.", checked: false, statusChecked: ''},
        {item: "Check for spacer / paper joint.", checked: false, statusChecked: ''},
        {item: "Check for tile drop.", checked: false, statusChecked: ''},
        {item: "Check for tile grout.", checked: false, statusChecked: ''},
        {item: "Check if the tile is soaked before laying.", checked: false, statusChecked: ''},
        {item: "Check for slope.", checked: false, statusChecked: ''}
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
                                {({errors, touched, handleChange, handleBlur}) => (
                                    <FormikForm>
                                        <Row>
                                            <Col md={12}>
                                                <FormGroup
                                                    className={errors.InspectionTitle && touched.InspectionTitle && 'has-error'}>
                                                    <Label for="Inspection Title">Title *</Label>
                                                    <Field className="form-control" name="InspectionTitle" type="text"
                                                           placeholder="Title"/>
                                                    {errors.InspectionTitle && touched.InspectionTitle && (
                                                        <div
                                                            className="block text-red-800">{errors.InspectionTitle}</div>)}
                                                </FormGroup>
                                            </Col>
                                            <Col md={6} className="d-none">
                                                <FormGroup
                                                    className={errors.InspectionTag && touched.InspectionTag && 'has-error'}>
                                                    <Label for="Inspection Tag">Tag *</Label>
                                                    <Field className="form-control" name="InspectionTag" type="text"
                                                           placeholder="Tag"/>
                                                    {errors.InspectionTag && touched.InspectionTag && (
                                                        <div
                                                            className="block text-red-800">{errors.InspectionTag}</div>)}
                                                </FormGroup>
                                            </Col>
                                            <Col md={12}>
                                                <FormGroup
                                                    className={errors.InspectionDescription && touched.InspectionDescription && 'has-error'}>
                                                    <Label for="Inspection Description">Description *</Label>
                                                    <Field className="form-control" rows={3}
                                                           name="InspectionDescription" component="textarea"
                                                           placeholder="Description"/>
                                                    {errors.InspectionDescription && touched.InspectionDescription && (
                                                        <div
                                                            className="block text-red-800">{errors.InspectionDescription}</div>)}
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup
                                                    className={errors.ChecklistType && touched.ChecklistType && 'has-error'}>
                                                    <Label for="Checklist Type">Checklist Type *</Label>
                                                    <select className="custom-select d-block w-100 form-control"
                                                            name="ChecklistType"
                                                            onBlur={handleBlur}
                                                            onChange={(ev) => {
                                                                handleChange(ev);
                                                                changeSelectOptionHandler(ev);
                                                            }}>
                                                        <option value="">Choose Checklist Type</option>
                                                        <option>Structure</option>
                                                        <option>Services</option>
                                                        <option>Finishes</option>
                                                    </select>
                                                    {errors.ChecklistType && touched.ChecklistType && (
                                                        <div
                                                            className="block text-red-800">{errors.ChecklistType}</div>)}
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup
                                                    className={errors.ChecklistSubType && touched.ChecklistSubType && 'has-error'}>
                                                    <Label for="Checklist Type">Checklist Subtype *</Label>
                                                    <select className="custom-select d-block w-100 form-control"
                                                            name="ChecklistSubType"
                                                            onBlur={handleBlur}
                                                            onChange={(ev) => {
                                                                handleChange(ev);
                                                                changeSelectOptionHandler1(ev)
                                                            }}>
                                                        <option value="">Choose SubChecklist Type</option>
                                                        {subTypesOptions}
                                                    </select>
                                                    {errors.ChecklistSubType && touched.ChecklistSubType && (
                                                        <div
                                                            className="block text-red-800">{errors.ChecklistSubType}</div>)}
                                                </FormGroup>
                                            </Col>
                                            <Col md={12}>
                                                <FormGroup>
                                                    <Label for="Checklist Type" className="font-weight-bold">Checklist
                                                        Points</Label> <br/>
                                                    {checklist.map((clist, index) => {
                                                        return (
                                                            <React.Fragment key={index}>
                                                                <Label className="form-label">
                                                                    {clist.item}
                                                                </Label>
                                                            </React.Fragment>
                                                        )
                                                    })}
                                                    {/*{errors.InspectionTag && touched.InspectionTag && (
                                                        <div
                                                            className="block text-red-800">{errors.InspectionTag}</div>)}*/}
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup
                                                    className={errors.InspectionProject && touched.InspectionProject && 'has-error'}>
                                                    <Label for="Inspection Project">Project *</Label>
                                                    <select className="custom-select d-block w-100 form-control" id=""
                                                            name="InspectionProject"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}>
                                                        <option value="">Choose Project</option>
                                                        <option>Project-1</option>
                                                    </select>
                                                    {errors.InspectionProject && touched.InspectionProject && (
                                                        <div
                                                            className="block text-red-800">{errors.InspectionProject}</div>)}
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup
                                                    className={errors.SubProject && touched.SubProject && 'has-error'}>
                                                    <Label for="Sub Project">Sub Project *</Label>
                                                    <select className="custom-select d-block w-100 form-control" id=""
                                                            name="SubProject"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}>
                                                        <option value="">Choose SubProject</option>
                                                        <option>SubProject-1</option>
                                                    </select>
                                                    {errors.SubProject && touched.SubProject && (
                                                        <div
                                                            className="block text-red-800">{errors.SubProject}</div>)}
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup
                                                    className={errors.InspectionMember && touched.InspectionMember && 'has-error'}>
                                                    <Label for="Inspection Member">Assigned To *</Label>
                                                    <select className="custom-select d-block w-100 form-control" id=""
                                                            name="InspectionMember"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}>
                                                        <option value="">Choose Member</option>
                                                        <option>Inspector</option>
                                                    </select>
                                                    {errors.InspectionMember && touched.InspectionMember && (
                                                        <div
                                                            className="block text-red-800">{errors.InspectionMember}</div>)}
                                                </FormGroup>
                                            </Col>
                                            <Col md={12}>
                                                <FormGroup
                                                    className={errors.InspectionFile && touched.InspectionFile && 'has-error'}>
                                                    <Label for="Inspection file">Images</Label>
                                                    <input className="form-control" type="file" style={{
                                                        height: '60px'
                                                    }} id="" accept="image/*"
                                                           name="InspectionFile"
                                                           onChange={(ev) => {
                                                               images = [];
                                                               if (ev.target.files) {
                                                                   for (let i = 0; i < ev.target.files.length; i++) {
                                                                       images.push(ev.target.files[i]);
                                                                   }
                                                               }
                                                           }}
                                                           multiple/>
                                                    {errors.InspectionFile && touched.InspectionFile && (
                                                        <div
                                                            className="block text-red-800">{errors.InspectionFile}</div>)}
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
