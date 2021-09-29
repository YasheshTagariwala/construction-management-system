import React from "react";
import {Card, CardBody, Col, Row} from "reactstrap";

function Dashboard(props) {
    return (
        <React.Fragment>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h3 className="mb-0 font-weight-normal">Dashboard</h3>
            </div>
            <Row className="mb-3">
                <Col xl={3} md={6} className="mb-4">
                    <Card className="h-100">
                        <CardBody>
                            <Row className="align-items-center">
                                <Col className="mr-2">
                                    <div className="text-sm font-weight-normal primary-color text-uppercase mb-1">Total
                                        Members
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">4,000</div>
                                    <div className="mt-2 mb-0 text-muted text-xs">
                                        <span className="text-success mr-2">
                                            <i className="fa fa-arrow-up"/> 3.48%</span>
                                        <span>Since last month</span>
                                    </div>
                                </Col>
                                <div className="col-auto">
                                    <i className="fas fa-users fa-2x primary-color"/>
                                </div>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
                <Col xl={3} md={6} className="mb-4">
                    <Card className="h-100">
                        <CardBody>
                            <Row className="align-items-center">
                                <Col className="mr-2">
                                    <div className="text-sm font-weight-normal primary-color text-uppercase mb-1">Total
                                        Project
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">4,000</div>
                                    <div className="mt-2 mb-0 text-muted text-xs">
                                        <span className="text-success mr-2">
                                            <i className="fa fa-arrow-up"/> 12%</span>
                                        <span>Since last years</span>
                                    </div>
                                </Col>
                                <div className="col-auto">
                                    <i className="fas fa-home fa-2x primary-color"/>
                                </div>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
                <Col xl={3} md={6} className="mb-4">
                    <Card className="h-100">
                        <CardBody>
                            <Row className="align-items-center">
                                <Col className="mr-2">
                                    <div className="text-sm font-weight-normal primary-color text-uppercase mb-1">New
                                        Inspection
                                    </div>
                                    <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">366</div>
                                    <div className="mt-2 mb-0 text-muted text-xs">
                                        <span className="text-success mr-2">
                                            <i className="fa fa-arrow-up"/> 20.4%</span>
                                        <span>Since last month</span>
                                    </div>
                                </Col>
                                <div className="col-auto">
                                    <i className="fas fa-address-card fa-2x primary-color"/>
                                </div>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
                <Col xl={3} md={6} className="mb-4">
                    <Card className="h-100">
                        <CardBody>
                            <Row className="align-items-center">
                                <Col className="mr-2">
                                    <div className="text-sm font-weight-normal primary-color text-uppercase mb-1">
                                        Pending Inspection
                                    </div>
                                    <div className="h5 mb-sm-0 font-weight-normal primary-color text-gray-800">18</div>
                                    <div className="mt-2 mb-0 text-muted text-xs">
                                        <span className="text-danger mr-2">
                                            <i className="fa fa-arrow-down"/> 1.10%</span>
                                        <span>Since yesterday</span>
                                    </div>
                                </Col>
                                <div className="col-auto">
                                    <i className="fas fa-comments fa-2x primary-color"/>
                                </div>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default Dashboard
