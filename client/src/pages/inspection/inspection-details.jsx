import React, {useEffect, useState} from 'react';
import {
    Card, CardBody, Row, Media, Button, Collapse, CardFooter,
    Modal, ModalHeader, ModalBody, ModalFooter, Col, Label
} from 'reactstrap';
import avatar from '../../assets/images/avatar.png';
import {Link} from "react-router-dom";
import {inspectionDetails, inspectionUpdate} from "../../redux/inspection/actions";
import {connect} from "react-redux";
import Loader from "../../components/loader";
import {Field} from "formik";

function InspectionDetailsPage(props) {
    const {inspectionDetails: getInspectionDetails} = props;
    const [inspectionDetail, setInspectionDetail] = useState({});
    const [inspectionSessions, setInspectionSessions] = useState([]);
    const [modalDetails, setModalDetails] = useState(null);
    const [issueText, setIssueText] = useState('');

    useEffect(() => {
        getInspectionDetails({text: props.match.params.id})
    }, [getInspectionDetails, props.match.params.id])

    useEffect(() => {
        if (props.inspection) {
            let inspection = props.inspection;
            setInspectionDetail(inspection);
            setInspectionSessions(inspection.sessions.reverse().map((t, i) => ({
                ...t,
                isOpen: i === 0
            })));
        }
    }, [props.inspection])

    const updateSession = () => {
        let body = {
            id: props.match.params.id,
            updated_details: {
                ...inspectionDetail,
                sessions: inspectionSessions
            }
        }
        props.inspectionUpdate(body, props.history);
    }

    return (
        <React.Fragment>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h3 className="mb-0 font-weight-normal">Inspection Details</h3>
                <Button className="add-button d-none" color="default"
                        onClick={() => props.history.push(`/${props.user?.role}/inspection/edit/${inspectionDetail.id}`)}
                        size="sm"><i className="fa fa-edit"/></Button>
            </div>
            {props.loading && <Loader/>}
            <Row>
                <div className="col-12 mb-4">
                    {inspectionSessions.map((item, index) => (
                        <React.Fragment key={index}>
                            <Button
                                className="primary-background text-white w-100 text-left p-3 d-flex align-items-center justify-content-between"
                                onClick={() => {
                                    setInspectionSessions(() => {
                                        let sessions = inspectionSessions;
                                        sessions[index].isOpen = !sessions[index].isOpen
                                        return [...sessions];
                                    })
                                }}
                                color="default">
                                {item.name}
                                <i className={`fa ${item.isOpen ? 'fa-arrow-down' : 'fa-arrow-right'}`}/>
                            </Button>
                            <Collapse isOpen={item.isOpen}>
                                <Card>
                                    <CardBody>
                                        <Media className="align-items-center">
                                            <div className="bg-gray-200 p-3 rounded-circle">
                                                <i className="fas fa-address-card fa-2x primary-color"/>
                                            </div>
                                            <Media body className="ml-3">
                                                <h5 className="mb-1 primary-color font-weight-bold">{item.name}</h5>
                                                {/*<p className="m-0 small text-gray-700">20 May 2018</p>*/}
                                                <p className="m-0 small text-gray-700">{item.created_at}</p>
                                            </Media>
                                            <div className="ml-auto">
                                                <p className="small text-gray-700 text-uppercase mb-1">Inspector</p>
                                                <div className="d-flex align-items-center overflow-hidden">
                                                    <div className="inspection-member mx-1">
                                                        <img src={avatar} alt="" className="embed-responsive"
                                                             title={item.assigned_to}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </Media>
                                        <hr/>
                                        <p className="text-gray-600 font-weight-normal">{item.notes}</p>
                                        <h5 className="py-2 mt-4 font-weight-bold primary-color border-bottom d-none">Issues</h5>
                                        <ul className="project-tags my-2 d-none">
                                            <li>lorem ipsum</li>
                                            <li>lorem ipsum</li>
                                            <li>lorem ipsum</li>
                                            <li>lorem ipsum</li>
                                            <li>lorem ipsum</li>
                                            <li>lorem ipsum</li>
                                            <li>lorem ipsum</li>
                                        </ul>

                                        <React.Fragment>
                                            <h5 className="py-2 mt-4 font-weight-bold primary-color border-bottom">Images Gallery</h5>
                                            <div className="inspection-images-gallery">
                                                {(item.images || []).map((img, imgKey) => (
                                                    <div key={`img-${imgKey}`} className="slide">
                                                        <div className="rounded border-bottom">
                                                            <img src={img} alt="" className="embed-responsive"/>
                                                        </div>
                                                    </div>
                                                ))}
                                                {item.images.length <= 0 && 'NO IMAGES'}
                                            </div>

                                            <h5 className="py-2 mt-4 font-weight-bold primary-color border-bottom">Check list</h5>
                                            <ul className="project-checklist p-0 m-0">
                                                {(item.checklist || []).map((chk, chkKey) => (
                                                    <li key={`chklist-${chkKey}`} className="mt-2 p-3">
                                                        <div onClick={() => {setModalDetails({
                                                            index,
                                                            checkListIndex: chkKey
                                                        })}}
                                                            className="d-flex align-items-center justify-content-between">
                                                            <div
                                                                className="custom-checkbox custom-control custom-control-inline align-items-center pl-0">
                                                                {/*<input type="checkbox" className="custom-control-input"
                                                                       onChange={(ev) => {
                                                                           setInspectionSessions(() => {
                                                                               let sessions = inspectionSessions;
                                                                               let checkList = sessions[index].checklist;
                                                                               checkList[chkKey].checked = ev.target.checked
                                                                               sessions[index].checklist = [...checkList];
                                                                               return [...sessions];
                                                                           })
                                                                       }}
                                                                       id={`customControlInline-${chkKey}`}
                                                                       checked={chk.checked}/>
                                                                <label className="custom-control-label"
                                                                       htmlFor={`customControlInline-${chkKey}`}>{chk.item}</label>*/}
                                                                <label>{chk.item}</label>
                                                            </div>
                                                            <Link to="#"
                                                                  className="p-2 bg-gray-300 rounded ml-3 d-none"><i
                                                                className="fa fa-ellipsis-v"/></Link>
                                                        </div>
                                                        <div className={'mt-1'}>
                                                            <label className={'custom-checkbox custom-control custom-control-inline align-items-center'}>
                                                                <input type="checkbox" className="custom-control-input"
                                                                       onChange={(ev) => {
                                                                           setInspectionSessions(() => {
                                                                               let sessions = inspectionSessions;
                                                                               let checkList = sessions[index].checklist;
                                                                               checkList[chkKey].statusChecked = checkList[chkKey].statusChecked === 'yes' ? null : 'yes'
                                                                               sessions[index].checklist = [...checkList];
                                                                               return [...sessions];
                                                                           })
                                                                       }}
                                                                       id={`customControlInline-yes-${chkKey}`}
                                                                       checked={chk.statusChecked === 'yes'}/>
                                                                <label className="custom-control-label"
                                                                       htmlFor={`customControlInline-yes-${chkKey}`}>Yes</label>
                                                                {/*<input type="radio" value="yes" name={`radio-${chkKey}`} /> Yes*/}
                                                            </label>
                                                            <label className={'custom-checkbox custom-control custom-control-inline align-items-center ml-4'}>
                                                                <input type="checkbox" className="custom-control-input"
                                                                       onChange={(ev) => {
                                                                           setInspectionSessions(() => {
                                                                               let sessions = inspectionSessions;
                                                                               let checkList = sessions[index].checklist;
                                                                               checkList[chkKey].statusChecked = checkList[chkKey].statusChecked === 'no' ? null : 'no'
                                                                               sessions[index].checklist = [...checkList];
                                                                               return [...sessions];
                                                                           })
                                                                       }}
                                                                       id={`customControlInline-no-${chkKey}`}
                                                                       checked={chk.statusChecked === 'no'}/>
                                                                <label className="custom-control-label"
                                                                       htmlFor={`customControlInline-no-${chkKey}`}>No</label>
                                                                {/*<input type="radio" value="no" name={`radio-${chkKey}`} /> No*/}
                                                            </label>
                                                            <label className={'custom-checkbox custom-control custom-control-inline align-items-center ml-4'}>
                                                                <input type="checkbox" className="custom-control-input"
                                                                       onChange={(ev) => {
                                                                           setInspectionSessions(() => {
                                                                               let sessions = inspectionSessions;
                                                                               let checkList = sessions[index].checklist;
                                                                               checkList[chkKey].statusChecked = checkList[chkKey].statusChecked === 'not_applicable' ? null : 'not_applicable'
                                                                               sessions[index].checklist = [...checkList];
                                                                               return [...sessions];
                                                                           })
                                                                       }}
                                                                       id={`customControlInline-na-${chkKey}`}
                                                                       checked={chk.statusChecked === 'not_applicable'}/>
                                                                <label className="custom-control-label"
                                                                       htmlFor={`customControlInline-na-${chkKey}`}>Not Applicable</label>
                                                                {/*<input type="radio" value="NA" name={`radio-${chkKey}`} /> N/A*/}
                                                            </label>
                                                        </div>
                                                        {chk.issues && chk.issues.length > 0 && <div className={'ml-4'}>
                                                            <h5 className="py-1 mt-3 font-weight-bold primary-color">Issue</h5>
                                                            <ul className="project-checklist p-0 m-0">
                                                                {chk.issues.map((issue, issueInx) => (
                                                                    <li key={`issue-${chkKey}-${issueInx}`} className="mt-2 p-2">
                                                                        <label className={'mb-0'}>{issue}</label>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>}
                                                    </li>
                                                ))}
                                            </ul>
                                        </React.Fragment>

                                        <h5 className="py-2 mt-4 font-weight-bold primary-color border-bottom d-none">Activity</h5>
                                        <div className="media media-reply bg-gray-200 rounded p-3 d-none">
                                            <img className="mr-3 circle-rounded" src={avatar} width="50px"
                                                 height="50px" alt=""/>
                                            <div className="media-body">
                                                <h6 className="d-flex">Milan Gbah
                                                    <small className="text-muted small ml-auto">about 3 days ago</small>
                                                </h6>
                                                <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
                                                    scelerisque
                                                    ante
                                                    sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus
                                                    viverra
                                                    turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec
                                                    lacinia
                                                    congue felis in faucibus.</p>
                                            </div>
                                        </div>

                                        <form action="#" className="form-profile d-none">
                                            <div className="form-group">
                                        <textarea className="form-control" name="textarea" id="textarea" rows="3"
                                                  placeholder="Post a new message"/>
                                            </div>
                                            <div className="d-flex justify-content-end">
                                                <button className="btn primary-btn">Send</button>
                                            </div>
                                        </form>
                                        <CardFooter
                                            className="d-flex justify-content-end align-items-center bg-transparent">
                                            <Button size="sm" onClick={() => updateSession()} color="default"
                                                    className="primary-background text-white">Save
                                                Session</Button>
                                        </CardFooter>
                                    </CardBody>
                                </Card>
                            </Collapse>
                        </React.Fragment>
                    ))}
                </div>
            </Row>

            <Modal isOpen={modalDetails} toggle={() => {setModalDetails(null); setIssueText('');}}>
                <ModalHeader toggle={() => {setModalDetails(null); setIssueText('');}}>Add Issue</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col md={12}>
                            <Label for="Issue">Issue *</Label>
                            <textarea placeholder={'Issue'} onChange={(ev) => setIssueText(ev.target.value)} value={issueText} className={'form-control'}/>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => {
                        if (issueText && issueText.trim()) {
                            setInspectionSessions(() => {
                                let sessions = inspectionSessions;
                                let checkList = sessions[modalDetails.index].checklist;
                                if (!checkList[modalDetails.checkListIndex].issues || checkList[modalDetails.checkListIndex].issues.length === 0) {
                                    checkList[modalDetails.checkListIndex].issues = [];
                                }
                                checkList[modalDetails.checkListIndex].issues.push(issueText);
                                sessions[modalDetails.index].checklist = [...checkList];
                                return [...sessions];
                            })
                            setModalDetails(null)
                            setIssueText('');
                        }
                    }}>Save</Button>{' '}
                    <Button color="secondary" onClick={() => {setModalDetails(null); setIssueText('');}}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </React.Fragment>
    )
}

const mapStateToProps = ({inspectionsReducer, authUser}) => {
    const {inspection, loading, error, success} = inspectionsReducer
    const {user} = authUser
    return {inspection, loading, error, user, success}
}

const mapActionsToProps = {inspectionDetails, inspectionUpdate}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(InspectionDetailsPage)
