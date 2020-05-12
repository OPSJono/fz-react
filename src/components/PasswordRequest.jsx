import React, { Component } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as api from '../constants/api.js';
import DynamicForm from "./DynamicForm";

class PasswordRequest extends Component {

    state = {
        errors: [],
        email: null,
        sent: null,
    };

    formRequest = () => {
        return {
            request_uri: api.BASE_DOMAIN+'/v1/oauth/password/request',
            request_method: 'POST',
            request_headers: {},
            request_button: {
                text: "Send reset email",
                class: "btn-primary"
            }
        };
    };

    formFields = () => {
        return {
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
            callback_url: {
                id: 'callback_url',
                name: 'callback_url',
                type: 'hidden',
                label: 'Callback URL',
                value: 'http://fz-react.docker/password/reset',
                rules: {
                    required: true,
                    min: 0,
                    max: null,
                    regex: null,
                }
            }
        };
    };

    callback = response => {
        if(response.data) {
            response = response.data;
        }
        const success = response.data.sent;

        this.setState({
            ...this.state,
            sent: success,
        });
    };

    success = () => {
        return (
            <React.Fragment>
                <div className="flex flex-col justify-center py-4 sm:px-6 lg:px-8">
                    <div className="md:w-full lg:w-1/2mx-auto text-center">
                        <FontAwesomeIcon icon={"check"} className="fa-4x text-blue-400 pr-3" />
                        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-400">
                            Email sent!
                        </h2>
                    </div>

                    <div className="mt-8 md:w-full lg:w-1/3 mx-auto">
                        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
                            <div className="text-center">
                                <h4 className="block font-bold leading-5 text-gray-400">
                                    We have sent you an email with a link to reset your password.
                                </h4>
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
                                    There has been an error trying to send you a password reset email. <br />
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

        if(this.state.sent === true) {
            return this.success();
        }

        if(this.state.sent === false) {
            return this.failed();
        }

        return (
            <React.Fragment>
                <div className="flex flex-col justify-center py-4 sm:px-6 lg:px-8">
                    <div className="md:w-full lg:w-1/2mx-auto text-center">
                        <FontAwesomeIcon icon={"envelope"} className="fa-4x text-blue-400 pr-3" />
                        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-400">
                            Request password reset
                        </h2>
                    </div>

                    <div className="mt-8 md:w-full lg:w-1/3 mx-auto">
                        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
                            <DynamicForm request={this.formRequest} fields={this.formFields} callback={this.callback} />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    };



}

export default PasswordRequest;
