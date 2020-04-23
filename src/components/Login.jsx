import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from 'axios';

class Login extends Component {

    static CLIENT_ID = '2';
    static CLIENT_SECRET = 'k2useT2XqbCWwLOdSg1kngBFdXao7ukrWY05ot20';

    async handleSubmit(event) {
        event.preventDefault();

        // NOTE: you access FormData fields with `data.get(fieldName)`
        const data = new FormData(event.target);

        data.set('grant_type', 'password');
        data.set('client_id', Login.CLIENT_ID);
        data.set('client_secret', Login.CLIENT_SECRET);
        data.set('username', data.get('email'));

        let result = await axios.post('http://filezone.docker/v1/oauth/token', data);

        console.log(result.data);
    }

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
                                        <input id="email" name="email" type="email" required
                                               autoComplete="email"
                                               className="border-red-600 border-gray-600 w-full bg-gray-800 text-sm text-gray-400 transition border focus:outline-none focus:border-gray-600 rounded p-2 leading-normal"/>
                                        <span className="invalid-feedback text-red-600" role="alert">
                                            <strong>Form error message</strong>
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <label htmlFor="password"
                                           className="block text-sm font-medium leading-5 text-gray-400">
                                        Password
                                    </label>
                                    <div className="mt-1 rounded-md shadow-sm">
                                        <input id="password" name="password" type="password" required
                                               autoComplete="current-password"
                                               className="border-red-600 border-gray-600 w-full bg-gray-800 text-sm text-gray-400 transition border focus:outline-none focus:border-gray-600 rounded p-2 leading-normal"/>
                                        <span className="invalid-feedback text-red-600" role="alert">
                                            <strong>Form error message</strong>
                                        </span>
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
