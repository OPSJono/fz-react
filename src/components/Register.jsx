import React, { Component } from 'react';
import {Link} from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Register extends Component {

    render() {
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
                            <form action="/login" method="POST">
                                <div className="">
                                    <label htmlFor="first_name"
                                           className="block text-sm font-medium leading-5 text-gray-400">
                                        First Name
                                    </label>
                                    <div className="mt-1 rounded-md shadow-sm">
                                        <input id="first_name" name="first_name" type="first_name" required
                                               autoComplete="first_name"
                                               className="border-red-600 border-gray-600 w-full bg-gray-800 text-sm text-gray-400 transition border focus:outline-none focus:border-gray-600 rounded p-2 leading-normal"/>
                                        <span className="invalid-feedback text-red-600" role="alert">
                                            <strong>Form error message</strong>
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <label htmlFor="middle_name"
                                           className="block text-sm font-medium leading-5 text-gray-400">
                                        Middle Name
                                    </label>
                                    <div className="mt-1 rounded-md shadow-sm">
                                        <input id="middle_name" name="middle_name" type="first_name"
                                               autoComplete="first_name"
                                               className="border-red-600 border-gray-600 w-full bg-gray-800 text-sm text-gray-400 transition border focus:outline-none focus:border-gray-600 rounded p-2 leading-normal"/>
                                        <span className="invalid-feedback text-red-600" role="alert">
                                            <strong>Form error message</strong>
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <label htmlFor="last_name"
                                           className="block text-sm font-medium leading-5 text-gray-400">
                                        Last Name
                                    </label>
                                    <div className="mt-1 rounded-md shadow-sm">
                                        <input id="last_name" name="last_name" type="first_name"
                                               autoComplete="first_name"
                                               className="border-red-600 border-gray-600 w-full bg-gray-800 text-sm text-gray-400 transition border focus:outline-none focus:border-gray-600 rounded p-2 leading-normal"/>
                                        <span className="invalid-feedback text-red-600" role="alert">
                                            <strong>Form error message</strong>
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-6">
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

                                <div className="mt-6">
                                    <label htmlFor="password"
                                           className="block text-sm font-medium leading-5 text-gray-400">
                                        Password Confirmation
                                    </label>
                                    <div className="mt-1 rounded-md shadow-sm">
                                        <input id="password-confirmation" name="password_confirmation" type="password" required
                                               autoComplete="current-password-confirmation"
                                               className="border-red-600 border-gray-600 w-full bg-gray-800 text-sm text-gray-400 transition border focus:outline-none focus:border-gray-600 rounded p-2 leading-normal"/>
                                        <span className="invalid-feedback text-red-600" role="alert">
                                            <strong>Form error message</strong>
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <span className="block w-full rounded-md shadow-sm">
                                        <button type="submit" className="w-full flex justify-center btn btn-primary">
                                          Register
                                        </button>
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    };



}

export default Register;
