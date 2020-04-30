import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "axios";

class Logout extends Component {

    state = {
        loggedOut: null,
        errors: [],
    };

    componentDidMount = async () => {
        await axios.post('http://filezone.docker/v1/oauth/logout', {}, {
            headers: { Authorization: "Bearer " + this.props.token }
        })
            .then(response => {
                this.setState({
                    loggedOut: response.data.success,
                    errors: []
                });
            })
            .catch(error => {
                let errors = [];
                errors.push(error.response.statusText);

                if(error.response && error.response.status === 401) {
                    errors.push("(You are not signed in)")
                }
                this.setState({
                    loggedOut: false,
                    errors: errors,
                });
            }).then(response => {
                this.props.removeCurrentUser();
            });
    };

    success = () => {
        return (
            <React.Fragment>
                <div className="flex flex-col justify-center py-4 sm:px-6 lg:px-8">
                    <div className="md:w-full lg:w-1/2mx-auto text-center">
                        <FontAwesomeIcon icon={"check"} className="fa-4x text-blue-400 pr-3" />
                        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-400">
                            Signed out!
                        </h2>
                    </div>

                    <div className="mt-8 md:w-full lg:w-1/3 mx-auto">
                        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
                            <div className="text-center">
                                <h4 className="block font-bold leading-5 text-gray-400">
                                    You have successfully signed out!
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
                            Unable to sign out.
                        </h2>
                    </div>

                    <div className="mt-8 md:w-full lg:w-1/3 mx-auto">
                        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
                            <div className="text-center">
                                <h4 className="block font-bold leading-5 text-gray-400">
                                    There has been an error trying to sign you out. <br />
                                    Please clear all local storage and cookies from your browser and try again.
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

        if(this.state.loggedOut === true) {
            return this.success();
        }

        if(this.state.loggedOut === false) {
            return this.failed();
        }

        return (
            <React.Fragment>
                <div className="flex flex-col justify-center py-4 sm:px-6 lg:px-8">
                    <div className="md:w-full lg:w-1/2mx-auto text-center">
                        <FontAwesomeIcon icon={"spinner"} className="fa-4x fa-spin text-blue-400 pr-3" />
                        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-400">
                            Signing out
                        </h2>
                    </div>

                    <div className="mt-8 md:w-full lg:w-1/3 mx-auto">
                        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
                            <div className="text-center">
                                <h4 className="block font-bold leading-5 text-gray-400">
                                    We are signing you out. Please wait.
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    };



}

export default Logout;
