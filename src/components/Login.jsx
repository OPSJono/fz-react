import React, { Component } from 'react';
import {Link, Redirect} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import DynamicForm from './DynamicForm.jsx';

class Login extends Component {

    formRequest = () => {
        return {
            request_uri: 'http://filezone.docker/v1/oauth/token',
            request_method: 'POST',
            request_headers: {
                headers: { Authorization: "Bearer " + this.props.token }
            },
            request_button: {
                text: "Sign In",
                class: "btn-primary"
            }
        };
    };

    formFields = () => {
        return {
            email: {
                id: 'username',
                name: 'username',
                type: 'email',
                label: 'Email',
                placeholder: 'Enter your Email address',
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
            }
        };
    };

    render() {

        if(this.props.isAuthenticated() === true) {
            return (<Redirect to="/" />)
        }

        return (
            <React.Fragment>
                <div className="flex flex-col justify-center py-4 sm:px-6 lg:px-8">
                    <div className="md:w-full lg:w-1/2 mx-auto text-center">
                        <FontAwesomeIcon icon={"lock"} className="fa-4x text-blue-400 pr-3" />
                        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-400">
                            Sign in to your account
                        </h2>
                    </div>

                    <div className="mt-8 md:w-full lg:w-1/2 mx-auto">
                        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
                            <DynamicForm loginForm={true} request={this.formRequest} fields={this.formFields} />
                            <div className="mt-6">
                                <div className="block text-sm font-medium leading-5 text-gray-400">
                                    Don't have an account?
                                </div>
                                <div className="mt-1 block w-full rounded-md shadow-sm">
                                    <Link to="/register" className="w-full flex justify-center btn btn-default">
                                        Register for free
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

export default Login;
