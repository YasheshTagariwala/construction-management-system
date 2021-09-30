import React, {useEffect, useState} from 'react';
import {
    Card, CardBody, Row, Media
} from 'reactstrap';
import avatar from '../../assets/images/avatar.png';
import {Link} from "react-router-dom";
import {inspectionList} from "../../redux/inspection/actions";
import {connect} from "react-redux";

function InspectionDetails(props) {

    const {inspectionList: getInspectionList} = props;
    const [inspectionList, setInspectionList] = useState([]);
    const [inspectionDetail, setInspectionDetail] = useState({});

    useEffect(() => {
        // getInspectionList({text: 'ogemp'})
        getInspectionList({text: props.user.role})
    }, [getInspectionList, props.user.role])

    useEffect(() => {
        // (props.inspections || [])
        setInspectionList(props.inspections);
        console.log('this.props.match.params.id', props.match.params.id);
        if (props.match.params.id && props.inspections) {
            const inx = props.match.params.id.split('-')[1] - 1;
            if (props.inspections[inx]) {
                const mInspection = props.inspections[inx];
                mInspection.id = `ins-${inx + 1}`
                setInspectionDetail(mInspection);
                console.log('mInspection', mInspection)
            }
        }
    }, [props.inspections])

    return (
        <React.Fragment>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h3 className="mb-0 font-weight-normal">Inspection Details</h3>
            </div>
            <Row>
                <div className="col-12 mb-4">
                    <Card>
                        <CardBody>
                            <Media className="align-items-center">
                                <div className="bg-gray-200 p-3 rounded-circle">
                                    <i className="fas fa-address-card fa-2x primary-color"/>
                                </div>
                                <Media body className="ml-3">
                                    <h5 className="mb-1 primary-color font-weight-bold">{inspectionDetail.name}</h5>
                                    {/*<p className="m-0 small text-gray-700">20 May 2018</p>*/}
                                    <p className="m-0 small text-gray-700">{inspectionDetail.created_at}</p>
                                </Media>
                                <div className="ml-auto">
                                    <p className="small text-gray-700 text-uppercase mb-1">Members</p>
                                    <div className="d-flex align-items-center overflow-hidden">
                                        <div className="inspection-member mx-1">
                                            <img src={avatar} alt="" className="embed-responsive"/>
                                        </div>
                                        <div className="inspection-member mx-1">
                                            <img src={avatar} alt="" className="embed-responsive"/>
                                        </div>
                                        <div className="inspection-member mx-1">
                                            <img src={avatar} alt="" className="embed-responsive"/>
                                        </div>
                                    </div>
                                </div>
                            </Media>
                            <hr/>
                            <p className="text-gray-600 font-weight-normal">Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Venenatis cras sed felis eget velit aliquet sagittis id. Vestibulum morbi blandit
                                cursus risus. Cursus in hac habitasse platea dictumst quisque sagittis. Quisque non
                                tellus orci ac auctor augue mauris augue neque. Egestas pretium aenean pharetra
                                magna ac placerat. Dolor sit amet consectetur adipiscing elit. Pellentesque pulvinar
                                pellentesque habitant morbi. Purus gravida quis blandit turpis cursus in. Nulla at
                                volutpat diam ut. Lorem ipsum dolor sit amet consectetur adipiscing elit. Convallis
                                posuere morbi leo urna molestie at. Quisque egestas diam in arcu cursus euismod
                                quis. Ac ut consequat semper viverra nam libero justo laoreet. Nulla facilisi cras
                                fermentum odio eu feugiat pretium nibh. Nunc scelerisque viverra mauris in aliquam
                                sem.</p>
                            <h5 className="py-2 mt-4 font-weight-bold primary-color border-bottom">Issues</h5>
                            <ul className="project-tags my-2">
                                <li>lorem ipsum</li>
                                <li>lorem ipsum</li>
                                <li>lorem ipsum</li>
                                <li>lorem ipsum</li>
                                <li>lorem ipsum</li>
                                <li>lorem ipsum</li>
                                <li>lorem ipsum</li>
                            </ul>

                            {(inspectionDetail.sessions || []).map(session => (
                                <>
                                    <h5 className="py-2 mt-4 font-weight-bold primary-color border-bottom">Images
                                        Gallery</h5>
                                    <div className="inspection-images-gallery">
                                        {(session.images || []).map((img, imgKey) => (
                                            <div key={`img-${imgKey}`} className="slide">
                                                <div className="rounded border-bottom">
                                                    <img src={img} alt="" className="embed-responsive"/>
                                                </div>
                                            </div>
                                        ))}
                                        {/*<div className="slide">
                                           <div className="rounded border-bottom">
                                               <img src={demoImage} alt="" className="embed-responsive"/>
                                           </div>
                                       </div>
                                       <div className="slide">
                                            <div className="rounded border-bottom">
                                                <img src={demoImage} alt="" className="embed-responsive"/>
                                            </div>
                                        </div>
                                        <div className="slide">
                                            <div className="rounded border-bottom">
                                                <img src={demoImage} alt="" className="embed-responsive"/>
                                            </div>
                                        </div>
                                        <div className="slide">
                                            <div className="rounded border-bottom">
                                                <img src={demoImage} alt="" className="embed-responsive"/>
                                            </div>
                                        </div>
                                        <div className="slide">
                                            <div className="rounded border-bottom">
                                                <img src={demoImage} alt="" className="embed-responsive"/>
                                            </div>
                                        </div>*/}
                                    </div>

                                    <h5 className="py-2 mt-4 font-weight-bold primary-color border-bottom">Check
                                        list</h5>
                                    <ul className="project-checklist p-0 m-0">
                                        {(session.checklist || []).map((chk, chkKey) => (
                                            <li key={`chklist-${chkKey}`} className="mt-2 p-3">
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <div
                                                        className="custom-checkbox custom-control custom-control-inline align-items-center">
                                                        <input type="checkbox" className="custom-control-input"
                                                               onChange={(ev) => {
                                                                   chk.checked = ev.target.checked
                                                               }}
                                                               id="customControlInline" checked={chk.checked}/>
                                                        <label className="custom-control-label"
                                                               htmlFor="customControlInline">{chk.item}</label>
                                                    </div>
                                                    <Link to="#" className="p-2 bg-gray-300 rounded ml-3"><i
                                                        className="fa fa-ellipsis-v"/></Link>
                                                </div>
                                            </li>
                                        ))}
                                        {/*<li className="mt-2 p-3">
                                           <div className="d-flex align-items-center justify-content-between">
                                               <div
                                                   className="custom-checkbox custom-control custom-control-inline align-items-center">
                                                   <input type="checkbox" className="custom-control-input"
                                                          id="customControlInline2"/>
                                                   <label className="custom-control-label"
                                                          htmlFor="customControlInline2">Lorem
                                                       ipsum
                                                       dolor
                                                       sit amet, consectetur adipisicing elit.</label>
                                               </div>
                                               <Link to="#" className="p-2 bg-gray-300 rounded ml-3"><i
                                                   className="fa fa-ellipsis-v"/></Link>
                                           </div>
                                       </li>
                                       <li className="mt-2 p-3">
                                           <div className="d-flex align-items-center justify-content-between">
                                               <div
                                                   className="custom-checkbox custom-control custom-control-inline align-items-center">
                                                   <input type="checkbox" className="custom-control-input"
                                                          id="customControlInline3"/>
                                                   <label className="custom-control-label"
                                                          htmlFor="customControlInline3">Lorem
                                                       ipsum
                                                       dolor
                                                       sit amet, consectetur adipisicing elit.</label>
                                               </div>
                                               <Link to="#" className="p-2 bg-gray-300 rounded ml-3"><i
                                                   className="fa fa-ellipsis-v"/></Link>
                                           </div>
                                       </li>*/}
                                    </ul>
                                </>
                            ))}

                            <h5 className="py-2 mt-4 font-weight-bold primary-color border-bottom">Activity</h5>
                            <div className="media media-reply bg-gray-200 rounded p-3">
                                <img className="mr-3 circle-rounded" src={avatar} width="50px"
                                     height="50px" alt=""/>
                                <div className="media-body">
                                    <h6 className="d-flex">Milan Gbah
                                        <small className="text-muted small ml-auto">about 3 days ago</small>
                                    </h6>
                                    <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
                                        ante
                                        sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus
                                        viverra
                                        turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec
                                        lacinia
                                        congue felis in faucibus.</p>
                                </div>
                            </div>

                            <form action="#" className="form-profile">
                                <div className="form-group">
                                        <textarea className="form-control" name="textarea" id="textarea" rows="3"
                                                  placeholder="Post a new message"/>
                                </div>
                                <div className="d-flex justify-content-end">
                                    <button className="btn primary-btn">Send</button>
                                </div>
                            </form>
                        </CardBody>
                    </Card>
                </div>
            </Row>
        </React.Fragment>
    )
}

const mapStateToProps = ({inspectionsReducer, authUser}) => {
    const {inspections, loading, error, success} = inspectionsReducer
    const {user} = authUser
    return {inspections, loading, error, user, success}
}

const mapActionsToProps = {inspectionList}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(InspectionDetails)
