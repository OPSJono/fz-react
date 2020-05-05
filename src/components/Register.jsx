import React, { Component } from 'react';
import {Link, Redirect} from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import * as api from '../constants/api.js';
import DynamicForm from "./DynamicForm";

class Register extends Component {

    state = {
        errors: {},
        result: {},
    };

    formRequest = () => {
        return {
            request_uri: api.BASE_DOMAIN+'/v1/oauth/register',
            request_method: 'POST',
            request_headers: {
                headers: { Authorization: "Bearer none" }
            },
            request_button: {
                text: "Register",
                class: "btn-primary"
            }
        };
    };

    formFields = () => {
        return {
            first_name: {
                id: 'first_name',
                name: 'first_name',
                type: 'text',
                label: 'First Name',
                placeholder: 'John',
                rules: {
                    required: true,
                    min: 2,
                    max: null,
                    regex: null,
                }
            },
            middle_name: {
                id: 'middle_name',
                name: 'middle_name',
                type: 'text',
                label: 'Middle Name',
                placeholder: 'Doe',
                rules: {
                    required: false,
                    min: 2,
                    max: null,
                    regex: null,
                }
            },
            last_name: {
                id: 'last_name',
                name: 'last_name',
                type: 'text',
                label: 'Last Name',
                placeholder: 'Smith',
                rules: {
                    required: false,
                    min: 2,
                    max: null,
                    regex: null,
                }
            },
            email: {
                id: 'email',
                name: 'email',
                type: 'email',
                label: 'Email',
                placeholder: 'johnsmith@example.com',
                rules: {
                    required: true,
                    min: 0,
                    max: null,
                    regex: null,
                }
            },
            password: {
                id: 'password',
                name: 'password',
                type: 'password',
                label: 'Password',
                placeholder: 'Enter your password',
                rules: {
                    required: true,
                    min: 0,
                    max: null,
                    regex: null,
                }
            },
            password_confirmation: {
                id: 'password_confirmation',
                name: 'password_confirmation',
                type: 'password',
                label: 'Password Confirmation',
                placeholder: 'Confirm your password',
                rules: {
                    required: true,
                    min: 0,
                    max: null,
                    regex: null,
                }
            }
        };
    };

    successCallback = (response) => {
        this.setState({
            errors: {},
            result: {
                ...response.data,
                resent: false
            },
        });
    };

    handleResend = async () => {
        const data = {
            user_id: this.state.result.data.id
        };
        await axios.post(api.BASE_DOMAIN+'/v1/oauth/verification/request', data)
            .then(response => {
                this.setState({
                    ...this.state,
                    result: {
                        ...this.state.result,
                        resent: true,
                        resent_error: false,
                    }
                });
            })
            .catch(error => {
                this.setState({
                    ...this.state,
                    result: {
                        ...this.state.result,
                        resent: false,
                        resent_error: true,
                    }
                });
                console.error(error);
            });
    };

    success = () => {
        return (
            <React.Fragment>
                <div className="flex flex-col justify-center py-4 sm:px-6 lg:px-8">
                    <div className="md:w-full lg:w-1/2mx-auto text-center">
                        <FontAwesomeIcon icon={"check"} className="fa-4x text-blue-400 pr-3" />
                        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-400">
                            Registration complete
                        </h2>
                    </div>

                    <div className="mt-8 md:w-full lg:w-1/3 mx-auto">
                        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
                            <div className="text-center">
                                <h4 className="block font-bold leading-5 text-gray-400">
                                    Thank you for registering. You should recieve a welcome email shortly. <br />
                                    You will need to verify your email address before you can sign in. <br />
                                </h4>
                                <p className="block font-normal leading-5 text-gray-400 mt-6">
                                    Not recieved an email yet? [<button className="font-bold underline" onClick={this.handleResend}>Resend</button>]
                                </p>
                            </div>

                            <div className="mt-6">
                                <div className="mt-1 block w-full rounded-md shadow-sm">
                                    <Link to="/login" className="w-full flex justify-center btn btn-default">
                                        Sign in
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    };

    resent = () => {
        return (
            <React.Fragment>
                <div className="flex flex-col justify-center py-4 sm:px-6 lg:px-8">
                    <div className="md:w-full lg:w-1/2mx-auto text-center">
                        <FontAwesomeIcon icon={"check"} className="fa-4x text-blue-400 pr-3" />
                        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-400">
                            Verification email re-sent
                        </h2>
                    </div>

                    <div className="mt-8 md:w-full lg:w-1/3 mx-auto">
                        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
                            <div className="text-center">
                                <h4 className="block font-bold leading-5 text-gray-400">
                                    We have sent another verification email to: <br /> <br />
                                    <span className="font-normal italic">{this.state.result.data.email}</span>
                                </h4>
                                <p className="block font-normal leading-5 text-gray-400 mt-6">
                                    Please be sure to check your spam folders. <br /> <br />
                                    Not recieved an email yet? [<button className="font-bold underline" onClick={this.handleResend}>Try again</button>]
                                </p>
                            </div>

                            <div className="mt-6">
                                <div className="mt-1 block w-full rounded-md shadow-sm">
                                    <Link to="/login" className="w-full flex justify-center btn btn-default">
                                        Sign in
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    };

    resentFailed = () => {
        let email = 'No email provided';
        if(this.state.result && this.state.result.data && this.state.result.data.email) {
            email = this.state.result.data.email;
        }

        return (
            <React.Fragment>
                <div className="flex flex-col justify-center py-4 sm:px-6 lg:px-8">
                    <div className="md:w-full lg:w-1/2mx-auto text-center">
                        <FontAwesomeIcon icon={"times"} className="fa-4x text-blue-400 pr-3" />
                        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-400">
                            Verification email failed
                        </h2>
                    </div>

                    <div className="mt-8 md:w-full lg:w-1/3 mx-auto">
                        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
                            <div className="text-center">
                                <h4 className="block font-bold leading-5 text-gray-400">
                                    Sorry, it seems we have not been able to send a verification email to: <br /> <br />
                                    <span className="font-normal italic">{ email }</span>
                                </h4>
                                <p className="block font-normal leading-5 text-gray-400 mt-6">
                                    If this problem persists please get in touch with support.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    };

    render() {
        if(this.props.isAuthenticated() === true) {
            return (<Redirect to="/" />)
        }

        if(typeof this.state.result.resent_error && this.state.result.resent_error === true) {
            return this.resentFailed();
        }

        if(this.state.result.resent && this.state.result.resent === true) {
            return this.resent();
        }

        if(this.state.result.success && this.state.result.success === true) {
            return this.success();
        }
        return (
            <React.Fragment>
                <div className="flex flex-col justify-center py-4 sm:px-6 lg:px-8">
                    <div className="md:w-full lg:w-1/2mx-auto text-center">
                        <FontAwesomeIcon icon={"lock"} className="fa-4x text-blue-400 pr-3" />
                        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-400">
                            Register for a new account
                        </h2>
                    </div>

                    <div className="mt-8 md:w-full lg:w-1/2 mx-auto">
                        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
                            <DynamicForm request={this.formRequest} fields={this.formFields} callback={this.successCallback} />
                            <div className="mt-6">
                                <div className="block text-sm font-medium leading-5 text-gray-400">
                                    Already have an account?
                                </div>
                                <div className="mt-1 block w-full rounded-md shadow-sm">
                                    <Link to="/login" className="w-full flex justify-center btn btn-default">
                                        Sign in
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    };



}

export default Register;
