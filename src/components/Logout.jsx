import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class Logout extends Component {

    state = {
        auth: null,
    };

    static getDerivedStateFromProps(props, state = {}) {
        if(props.isAuthenticated() === true) {
            props.removeCurrentUser();
        }

        state = {
            auth: props.isAuthenticated()
        };

        return state;
    }

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

    render() {

        if(this.state.auth === false) {
            return this.success();
        }

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



}

export default Logout;
