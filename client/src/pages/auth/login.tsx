import React, {useEffect, useState} from "react";
import poster from '../../assets/images/macbook.png';
import {loginUser} from "../../redux/auth/actions";
import {connect} from "react-redux";
import {Field, Form as FormikForm, Formik} from 'formik'
import {loginSchema} from '../../schemas/validation-schemas'
import ToasterService from "../../services/toaster-service";
import {Link} from 'react-router-dom';
import Loader from "../../components/loader";

const carousals: any = [
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

function Login(props: any) {
    const [formFields] = useState({
        remember_me: true,
        email: '',
        password: ''
    });
    const [slideIndex, setSlideIndex] = useState(0);
    const onUserLogin = (values: any) => {
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
        <div className="w-full flex-col">
            {props.loading && <Loader/>}
            <div className="flex flex-wrap">
                <div className="w-full lg:w-1/2 xl:w-2/5 lg:h-screen h-auto pt-20 pb-20 grid justify-items-center">
                    <div className="w-3/4 self-center">
                        <h1 className="uppercase text-4xl tracking-wide font-agenor-bold font-sans mb-6 sm:text-6xl">LogIn</h1>
                        <Formik initialValues={formFields}
                                validationSchema={loginSchema}
                                onSubmit={onUserLogin}>
                            {({errors, touched}) => (
                                <FormikForm>
                                    <div className="login-form">
                                        <div className="form-panel">
                                            <label className="form-label">Email ID</label>
                                            <Field className="form-input" placeholder="Email address" type="email" name="email"/>
                                            {errors.email && touched.email && (
                                                <div
                                                    className="block text-red-800">{errors.email}</div>)}
                                        </div>
                                        <div className="form-panel mt-4">
                                            <label className="form-label">Password</label>
                                            <Field className="form-input" placeholder="8+ character" type="password" name="password"/>
                                            {errors.password && touched.password && (
                                                <div
                                                    className="block text-red-800">{errors.password}</div>)}
                                        </div>

                                        <div className="flex flex-wrap">
                                            <div className="sm:w-1/2 w-full mt-3">
                                                <label className="inline-flex items-center">
                                                    <Field className="form-checkbox" type="checkbox"
                                                           name="remember_me"/>
                                                    {errors.remember_me && touched.remember_me && (
                                                        <div
                                                            className="block text-red-800">{errors.remember_me}</div>)}
                                                    <span className="ml-2">Remember Me</span>
                                                </label>
                                            </div>
                                            <div className="sm:w-1/2 w-full mt-3">
                                                <Link to="/" className="main-text-color float-right">Forget Password ?</Link>
                                            </div>
                                        </div>
                                        <button type="submit" disabled={props.loading}
                                                className="button blue-btn">SIGN
                                            IN
                                        </button>
                                    </div>
                                </FormikForm>
                            )}
                        </Formik>
                    </div>
                </div>
                <div className="banner w-full lg:w-1/2 xl:w-3/5 lg:h-screen h-auto pt-40 grid">
                    <div className="relative self-end">
                        <div className="relative w-full overflow-hidden text-center">
                            {carousals.map((carousal: any, index: number) => {
                                return (
                                    <React.Fragment key={index}>
                                        <input value={index} className="input-checked hidden" type="radio"
                                               name="carousel" onChange={() => null} checked={slideIndex === index}/>
                                        <div
                                            className="opacity-0 absolute m-auto text-white input-checked:static input-checked:opacity-100 transition-opacity ease-out duration-700">
                                            <img src={carousal.image} alt="Poster"
                                                 className="block max-w-full m-auto w-5/7"/>
                                            <div className="bg-primary h-72 sm:h-64 pt-12">
                                                <h2 className="text-2xl sm:text-3xl font-agenor-regular font-sans tracking-wide">
                                                    {carousal.title}
                                                </h2>
                                                <p className="text-xs sm:text-sm tracking-wide font-light mt-2.5 w-5/7 m-auto">
                                                    {carousal.message}
                                                </p>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                )
                            })}
                            <ol className="list-none m-0 p-0 absolute bottom-10 left-0 right-0 text-center z-9">
                                {carousals.map((carousal: any, index: number) => (
                                    <li key={index} className="inline-block my-0 mx-1.5"
                                        onClick={() => setSlideIndex(index)}>
                                        <label
                                            className="bg-white cursor-pointer block h-2.5 w-2.5 opacity-50 hover:opacity-100"/>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({authUser}: { authUser: any }) => {
    const {user, loading, error, success} = authUser
    return {user, loading, error, success}
}

const mapActionsToProps = {loginUser}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(Login)
