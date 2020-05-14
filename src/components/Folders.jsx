import React, { Component } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as api from '../constants/api.js';
import {Link, Redirect} from "react-router-dom";
import axios from "axios";

class Folders extends Component {

    constructor(props) {
        super(props);

        this.state = {
            errors: [],
            folders: [],
        };
    }

    async componentDidMount() {
        let url = api.BASE_DOMAIN+'/v1/folders';

        await axios.get(url, {
            headers: { Authorization: "Bearer " + this.props.token }
        }).then(response => {
            if(response.data) {
                response = response.data;
            }

            let errors = [];
            let folders = [];
            if(response.data.folders) {
                folders = response.data.folders;
            } else {
                errors.push("Unable to load folders");
            }

            this.setState({
                ...this.state,
                errors: errors,
                folders: folders
            });
        }).catch(error => {
            let errors = ["Unable to load folders."];

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
                folders: [],
            });
        });

    }



    success = () => {
        console.log(this.state.folders);
        return (
            <React.Fragment>
                <div className="flex flex-col justify-center py-4 sm:px-6 lg:px-8">
                    <div className="md:w-full lg:w-1/2mx-auto text-center">
                        <FontAwesomeIcon icon={"folder"} className="fa-4x text-blue-400 pr-3" />
                        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-400">
                            Your folders
                        </h2>
                    </div>

                    <div className="mt-8 md:w-full lg:w-2/3  mx-auto">
                        <div className="bg-gray-800 align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg">
                            <table className="min-w-full bg-gray-700">
                                <thead className="bg-gray-800">
                                <tr>
                                    <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                        Description
                                    </th>
                                    <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                        Sub-Folders
                                    </th>
                                    <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                        Files
                                    </th>
                                    <th className="px-6 py-3 border-b border-gray-200" />
                                </tr>
                                </thead>
                                <tbody className="bg-gray-700">
                                    {this.state.folders.map((folder, index) => (
                                        <tr key={folder.id}>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 leading-5 text-gray-200">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-8 w-8">
                                                        <FontAwesomeIcon icon={"folder"} className="fa-2x text-blue-400 p-0" />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm leading-5 font-medium text-gray-200">
                                                            {folder.name}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 border-b border-gray-200 text-sm leading-5 text-gray-200">
                                                {folder.description}
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                                                    {folder.sub_folder_count}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                                                    {folder.files_count}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                                                <a href="#" className="text-indigo-300 hover:text-indigo-500">View</a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
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
                                    There has been an error trying to load your folders. <br />
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
        if(!this.props.isAuthenticated() === true) {
            return (<Redirect to="/login" />)
        }

        if(this.state.folders && this.state.folders.length > 0) {
            return this.success();
        }

        if(this.state.errors && this.state.errors.length > 0) {
            return this.failed();
        }

        return (
            <React.Fragment>
                <div className="flex flex-col justify-center py-4 sm:px-6 lg:px-8">
                    <div className="md:w-full lg:w-1/2mx-auto text-center">
                        <FontAwesomeIcon icon={"envelope"} className="fa-4x text-blue-400 pr-3" />
                        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-400">
                            Your folders
                        </h2>
                    </div>

                    <div className="mt-8 md:w-full lg:w-1/3 mx-auto">
                        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
                            <div className="pb-4 text-center text-gray-400">
                                <i>Loading folders...</i>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    };



}

export default Folders;
