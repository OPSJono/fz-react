import React, { Component } from 'react';
import {Link, Redirect} from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

class Register extends Component {

    state = {
        errors: {},
        result: {},
    };

    CLIENT_ID = '2';
    CLIENT_SECRET = 'k2useT2XqbCWwLOdSg1kngBFdXao7ukrWY05ot20';

    handleSubmit = async (event) => {
        event.preventDefault();

        // NOTE: you access FormData fields with `data.get(fieldName)`
        const data = new FormData(event.target);

        data.set('grant_type', 'password');
        data.set('client_id', this.CLIENT_ID);
        data.set('client_secret', this.CLIENT_SECRET);

        let tmpErrors = {};

        if(data.get('first_name').length < 2) {
            tmpErrors.first_name = ["The First Name field is required"];
        }

        if(data.get('email').length < 2) {
            tmpErrors.email = ["The Email field is required"];
        }
        if(data.get('password').length < 2) {
            tmpErrors.password = ["The Password field is required"];
        }

        if(tmpErrors.first_name || tmpErrors.email || tmpErrors.password) {
            this.setState({
                errors: tmpErrors,
                result: {},
            });
            return;
        }

        await axios.post('http://filezone.docker/v1/oauth/register', data)
            .then(response => {
                this.setState({
                    errors: {},
                    result: response.data,
                });
            })
            .catch(error => {
                this.setState({
                    errors: error.response.data.errors,
                    result: {},
                });
            });
    };

    inputFor = (fieldName = 'input', type = 'text', required = false) => {
        let classNamesForInput = "border-gray-600 w-full bg-gray-800 text-sm text-gray-400 transition border focus:outline-none focus:border-gray-600 rounded p-2 leading-normal";

        let errorMessage = '';

        if(this.hasError(fieldName)) {
            classNamesForInput = "border-red-600 " + classNamesForInput;
            errorMessage = (
                <span className="invalid-feedback text-red-600" role="alert">
                    <strong>{this.getError(fieldName)}</strong>
                </span>
            );
        }

        let input = (<input id={fieldName} name={fieldName} type={type} autoComplete={fieldName}
                            className={classNamesForInput}/>);

        if(required) {
            input = (<input id={fieldName} name={fieldName} type={type} autoComplete={fieldName}
                            className={classNamesForInput} required />);
        }

        return (
            <React.Fragment>
                {input}
                {errorMessage}
            </React.Fragment>

        );
    };

    hasError = fieldName => {
        return this.getError(fieldName)
    };

    getError = fieldName => {
        if(this.state.errors[fieldName]) {
            return this.state.errors[fieldName][0];
        }
        return false;
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
                                    Thank you for registering. <br />
                                    Please sign in to continue.
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

    render() {
        if(this.props.isAuthenticated() === true) {
            return (<Redirect to="/" />)
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
                            <form action="/register" method="POST" onSubmit={this.handleSubmit}>
                                <div className="">
                                    <label htmlFor="first_name"
                                           className="block text-sm font-medium leading-5 text-gray-400">
                                        First Name
                                    </label>
                                    <div className="mt-1 rounded-md shadow-sm">
                                        {this.inputFor('first_name', 'text', true)}

                                    </div>
                                </div>
                                <div className="mt-6">
                                    <label htmlFor="middle_name"
                                           className="block text-sm font-medium leading-5 text-gray-400">
                                        Middle Name
                                    </label>
                                    <div className="mt-1 rounded-md shadow-sm">
                                        {this.inputFor('middle_name', 'text', false)}

                                    </div>
                                </div>
                                <div className="mt-6">
                                    <label htmlFor="last_name"
                                           className="block text-sm font-medium leading-5 text-gray-400">
                                        Last Name
                                    </label>
                                    <div className="mt-1 rounded-md shadow-sm">
                                        {this.inputFor('last_name', 'text', false)}

                                    </div>
                                </div>
                                <div className="mt-6">
                                    <label htmlFor="email"
                                           className="block text-sm font-medium leading-5 text-gray-400">
                                        Email address
                                    </label>
                                    <div className="mt-1 rounded-md shadow-sm">
                                        {this.inputFor('email', 'email', true)}

                                    </div>
                                </div>

                                <div className="mt-6">
                                    <label htmlFor="password"
                                           className="block text-sm font-medium leading-5 text-gray-400">
                                        Password
                                    </label>
                                    <div className="mt-1 rounded-md shadow-sm">
                                        {this.inputFor('password', 'password', true)}
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <label htmlFor="password"
                                           className="block text-sm font-medium leading-5 text-gray-400">
                                        Password Confirmation
                                    </label>
                                    <div className="mt-1 rounded-md shadow-sm">
                                        {this.inputFor('password_confirmation', 'password', true)}

                                    </div>
                                </div>

                                <div className="mt-6">
                                    <span className="block w-full rounded-md shadow-sm">
                                        <button type="submit" className="w-full flex justify-center btn btn-success">
                                          Register
                                        </button>
                                    </span>
                                </div>
                            </form>
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
