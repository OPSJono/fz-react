import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from 'axios';

class Login extends Component {

    state = {
        errors: {},
    };

    static CLIENT_ID = '2';
    static CLIENT_SECRET = 'k2useT2XqbCWwLOdSg1kngBFdXao7ukrWY05ot20';

    handleSubmit = async (event) => {
        event.preventDefault();

        // NOTE: you access FormData fields with `data.get(fieldName)`
        const data = new FormData(event.target);

        data.set('grant_type', 'password');
        data.set('client_id', Login.CLIENT_ID);
        data.set('client_secret', Login.CLIENT_SECRET);
        data.set('username', data.get('email'));

        let tmpErrors = {};

        if(data.get('email').length < 2) {
            tmpErrors.email = ["The Email field is required"];
        }
        if(data.get('password').length < 2) {
            tmpErrors.password = ["The Password field is required"];
        }

        if(tmpErrors.email || tmpErrors.password) {
            this.setState({
                errors: tmpErrors
            });
            return;
        }


        let result = await axios.post('http://filezone.docker/v1/oauth/token', data);

        if(result.status !== 200 && result.data.errors.length > 0) {
            this.setState({
                errors: result.data.errors
            });
        }

        this.props.setCurrentUser(result.data);
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
        return this.state.errors[fieldName];
    };

    render() {
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
                            <form action="/login" method="POST" onSubmit={this.handleSubmit}>
                                <div>
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

                                <div className="mt-6 flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input id="remember_me" name="remember_me" type="checkbox"
                                               className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"/>
                                        <label htmlFor="remember_me"
                                               className="ml-2 block text-sm leading-5 text-gray-600 cursor-pointer">
                                            Remember me
                                        </label>
                                    </div>

                                    <div className="text-sm leading-5">
                                        <Link to="/password/forgotten"
                                              className="font-medium text-indigo-600 hover:text-indigo-400 focus:outline-none focus:underline transition ease-in-out duration-150">
                                            Forgot your password?
                                        </Link>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <span className="block w-full rounded-md shadow-sm">
                                        <button type="submit" className="w-full flex justify-center btn btn-success">
                                          Sign in
                                        </button>
                                    </span>
                                </div>
                            </form>
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
