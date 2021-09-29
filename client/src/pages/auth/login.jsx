import React, {useEffect, useState} from "react";
import poster from '../../assets/images/macbook.png';
import {loginUser} from "../../redux/auth/actions";
import {connect} from "react-redux";
import {Field, Form as FormikForm, Formik} from 'formik'
import {loginSchema} from '../../schemas/validation-schemas'
import ToasterService from "../../services/toaster-service";
import {Link} from 'react-router-dom';
import Loader from "../../components/loader";
import {Button, Col, Container, FormGroup, Label, Row} from "reactstrap";

const carousals = [
    {
        title: 'Welcome to C360 Labs',
        message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur fugit ' +
            'eaque dolores, rerum reiciendis atque. Voluptatibus eaque quaerat, adipisci' +
            ' tempore ex in sunt et similique laborum eveniet quia! Voluptate, quo?',
        image: poster
    },
    {
        title: 'Welcome to C360 Labs',
        message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur fugit ' +
            'eaque dolores, rerum reiciendis atque. Voluptatibus eaque quaerat, adipisci' +
            ' tempore ex in sunt et similique laborum eveniet quia! Voluptate, quo?',
        image: poster
    },
    {
        title: 'Welcome to C360 Labs',
        message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur fugit ' +
            'eaque dolores, rerum reiciendis atque. Voluptatibus eaque quaerat, adipisci' +
            ' tempore ex in sunt et similique laborum eveniet quia! Voluptate, quo?',
        image: poster
    }
]

function Login(props) {
    const [formFields] = useState({
        remember_me: true,
        email: '',
        password: ''
    });
    const [slideIndex, setSlideIndex] = useState(0);
    const onUserLogin = (values) => {
        if (!props.loading) {
            props.loginUser(values, props.history)
        }
    }

    useEffect(() => {
        if (props.error) {
            ToasterService.Toast(props.error, 'error')
        }
        if (props.success) {
            ToasterService.Toast(props.success, 'error')
        }
    }, [props.error, props.success])

    return (
        <div className="log-in-page">
            {props.loading && <Loader/>}
            <Container fluid>
                <Row className="justify-content-center align-items-center">
                    <Col lg={5} className="px-0 mb-lg-0 mb-3">
                        <Formik initialValues={formFields}
                                validationSchema={loginSchema}
                                onSubmit={onUserLogin}>
                            {({errors, touched}) => (
                                <FormikForm className="log-in-form">
                                    <h1 className="section-title">LogIn</h1>
                                    <Row>
                                        <Col md={12}>
                                            <FormGroup>
                                                <Label for="emailID">Email ID</Label>
                                                <Field className="form-control" placeholder="Email address"
                                                       type="email" name="email"/>
                                                {errors.email && touched.email && (
                                                    <div className="d-block text-danger">{errors.email}</div>)}
                                            </FormGroup>
                                        </Col>
                                        <Col md={12}>
                                            <FormGroup>
                                                <Label for="password">Password</Label>
                                                <Field className="form-control" placeholder="8+ character"
                                                       type="password" name="password"/>
                                                {errors.password && touched.password && (
                                                    <div className="d-block text-danger">{errors.password}</div>)}
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <div
                                                    className="d-flex custom-checkbox custom-control custom-control-inline align-items-center">
                                                    <Field className="custom-control-input" type="checkbox"
                                                           id="rememberMe"
                                                           name="remember_me"/>
                                                    {errors.remember_me && touched.remember_me && (
                                                        <div
                                                            className="d-block text-danger">{errors.remember_me}</div>)}
                                                    <Label for="rememberMe" className="custom-control-label ml-1">Remember
                                                        Me</Label>
                                                </div>
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup className="text-end">
                                                <Link to="/">Forget Password?</Link>
                                            </FormGroup>
                                        </Col>
                                        <Col md={12} className="text-end mt-3">
                                            <Button type="submit" disabled={props.loading} className="primary-btn">SIGN
                                                IN</Button>
                                        </Col>
                                    </Row>
                                </FormikForm>
                            )}
                        </Formik>
                    </Col>
                    <Col lg={7} className="px-0">
                        <div className="carousel slide log-in-banner text-center">
                            <ol className="carousel-indicators">
                                {carousals.map((carousal, index) => (
                                    <li key={index} className={`${index === slideIndex ? 'active' : ''}`}
                                        onClick={() => setSlideIndex(index)}/>
                                ))}
                            </ol>
                            <div className="carousel-inner">
                                {carousals.map((carousal, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <div className={`carousel-item ${index === slideIndex ? 'active' : ''}`}>
                                                <img src={carousal.image} alt="Poster"/>
                                                <div className="carousel-caption primary-background">
                                                    <h2>{carousal.title}</h2>
                                                    <p>{carousal.message}</p>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    )
                                })}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

const mapStateToProps = ({authUser}) => {
    const {user, loading, error, success} = authUser
    return {user, loading, error, success}
}

const mapActionsToProps = {loginUser}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(Login)
