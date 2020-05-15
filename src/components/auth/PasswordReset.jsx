import React, { Component } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as api from "./../../constants/api.js";
import DynamicForm from "./../DynamicForm";
import {Link, Redirect} from "react-router-dom";
import axios from "axios";

class PasswordReset extends Component {

    constructor(props) {
        super(props);

        let search = window.location.search;
        let params = new URLSearchParams(search);
        let expires = params.get('expires');
        let id = params.get('id');
        let hash = params.get('hash');
        let signature = params.get('signature');

        this.state = {
            errors: [],
            email: null,
            reset: null,
            expires: expires,
            id: id,
            hash: hash,
            signature: signature,
            search_params: search,
            signature_valid: null,
        };
    }

    async componentDidMount() {
        let url = api.BASE_DOMAIN+'/v1/oauth/validate-url-signature';

        if(this.state.search_params != null) {
            url += this.state.search_params;
        }

        await axios.post(url, {
            validate_for_path: '/v1/oauth/password/reset',
        }).then(response => {
            let errors = [];
            let valid = true;
            if(response.data.errors && response.data.errors.length > 0) {
                errors = response.data.errors;
                valid = false;
            }

            this.setState({
                ...this.state,
                errors: errors,
                email: response.data.data.email,
                signature_valid: valid,
            });
        }).catch(error => {
            let errors = ["Unable to validate the URL Signature."];

            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx

                // If the server responded with some validation errors.
                if(error.response.data.message) {
                    errors.push(error.response.data.message);
                } else {
                    // Otherwise take the status code and text from the response
                    if(error.response && error.response.status && error.response.statusText) {
                        let extraInfo = '';
                        if(typeof error.response.data === 'string') {
                            extraInfo += "("+error.response.data+")";
                        }
                        errors.push(error.response.status + ": " + error.response.statusText + " " + extraInfo);
                    }
                }
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                errors.push("Unable to contact the server: (" + error.message +")");
            } else {
                // Something happened in setting up the request that triggered an Error
                // The `error.message` may contain more information.
                errors.push("Unable to contact the server: (" + error.message +")");
            }

            this.setState({
                ...this.state,
                errors: errors,
                email: null,
                signature_valid: false,
            });
        });

    }

    formRequest = () => {
        let url = api.BASE_DOMAIN+'/v1/oauth/password/reset';

        if(this.state.search_params != null) {
            url += this.state.search_params;
        }

        return {
            request_uri: url,
            request_method: 'POST',
            request_headers: {},
            request_button: {
                text: "Reset Password",
                class: "btn-primary"
            }
        };
    };

    formFields = () => {
        return {
            password: {
                id: 'password',
                name: 'password',
                type: 'password',
                label: 'Password',
                placeholder: 'Enter your new password',
                rules: {
                    required: true,
                    min: 0,
                    max: null,
                    regex: null,
                }
            },
            password_verification: {
                id: 'password_confirmation',
                name: 'password_confirmation',
                type: 'password',
                label: 'Password Confirmation',
                placeholder: 'Confirm your new password',
                rules: {
                    required: true,
                    min: 0,
                    max: null,
                    regex: null,
                }
            },
        };
    };

    callback = response => {
        if(response.data) {
            response = response.data;
        }
        const success = response.data.changed;

        this.setState({
            ...this.state,
            reset: success,
        });
    };

    success = () => {
        return (
            <React.Fragment>
                <div className="flex flex-col justify-center py-4 sm:px-6 lg:px-8">
                    <div className="md:w-full lg:w-1/2mx-auto text-center">
                        <FontAwesomeIcon icon={"check"} className="fa-4x text-blue-400 pr-3" />
                        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-400">
                            Password reset!
                        </h2>
                    </div>

                    <div className="mt-8 md:w-full lg:w-1/3 mx-auto">
                        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
                            <div className="text-center">
                                <h4 className="block font-bold leading-5 text-gray-400">
                                    Your password has been successfully reset. <br />
                                </h4>
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

    failed = () => {
        return (
            <React.Fragment>
                <div className="flex flex-col justify-center py-4 sm:px-6 lg:px-8">
                    <div className="md:w-full lg:w-1/2mx-auto text-center">
                        <FontAwesomeIcon icon={"times"} className="fa-4x text-blue-400 pr-3" />
                        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-400">
                            Whoops!
                        </h2>
                    </div>

                    <div className="mt-8 md:w-full lg:w-1/3 mx-auto">
                        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
                            <div className="text-center">
                                <h4 className="block font-bold leading-5 text-gray-400">
                                    There has been an error trying to reset your password. <br />
                                    Please try again later, if the problem persits please contact support.
                                </h4>
                                {this.requestError()}
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    };

    invalid = () => {
        return (
            <React.Fragment>
                <div className="flex flex-col justify-center py-4 sm:px-6 lg:px-8">
                    <div className="md:w-full lg:w-1/2mx-auto text-center">
                        <FontAwesomeIcon icon={"times"} className="fa-4x text-blue-400 pr-3" />
                        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-400">
                            Whoops!
                        </h2>
                    </div>

                    <div className="mt-8 md:w-full lg:w-1/3 mx-auto">
                        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
                            <div className="text-center">
                                <h4 className="block font-bold leading-5 text-gray-400">
                                    It looks like the URL or signature is invalid. <br /><br />
                                    Please try again later, if the problem persits please contact support.
                                </h4>
                                {this.requestError()}
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    };

    requestError = () => {
        if(this.state.errors.length > 0) {
            return (
                <React.Fragment>
                    <p className="mt-5 block font-normal leading-5 text-gray-400"> Some additional information may be available: </p>
                    <ul className="mt-5">
                        {this.state.errors.map((error, index) => (
                                <li key={index} className="mb-1 font-normal leading-5 text-red-400">
                                    <i>{error}</i>
                                </li>
                            )
                        )}
                    </ul>
                </React.Fragment>
            );
        }
    };

    render() {
        if(this.props.isAuthenticated() === true) {
            return (<Redirect to="/" />)
        }

        if(this.state.reset === true) {
            return this.success();
        }

        if(this.state.reset === false) {
            return this.failed();
        }

        if(this.state.signature_valid === false) {
            return this.invalid();
        }

        return (
            <React.Fragment>
                <div className="flex flex-col justify-center py-4 sm:px-6 lg:px-8">
                    <div className="md:w-full lg:w-1/2mx-auto text-center">
                        <FontAwesomeIcon icon={"envelope"} className="fa-4x text-blue-400 pr-3" />
                        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-400">
                            Reset password
                        </h2>
                    </div>

                    <div className="mt-8 md:w-full lg:w-1/3 mx-auto">
                        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
                            <div className="pb-4 text-center text-gray-400">
                                <i>{this.state.email || 'Validating email...'}</i>
                            </div>
                            <div>
                                <DynamicForm request={this.formRequest} fields={this.formFields} callback={this.callback} />
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    };



}

export default PasswordReset;
