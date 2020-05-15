import React, { Component } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as api from "./../../constants/api.js";
import {Redirect, useParams, withRouter} from "react-router-dom";
import ListFolders from "./ListFolders"
import axios from "axios";

class RootFolders extends Component {

    constructor(props) {
        super(props);
        let id = props.match.params.id;

        this.state = {
            errors: [],
            folder_id: id,
            current_folder: null,
            child_folders: [],
            files: [],
        };
    }

    componentDidMount() {
        this.loadData(this.state.folder_id).then(r => {});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // If the current url is different to the previous, re-fetch the contents
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.loadData(this.props.match.params.id).then(r => {});
        }
    }

    loadData = async (folder_id) => {
        let url = api.BASE_DOMAIN+'/v1/folders/'+folder_id+'/view';

        await axios.get(url, {
            headers: { Authorization: "Bearer " + this.props.token }
        }).then(response => {
            if(response.data) {
                response = response.data;
            }

            let errors = [];
            let folders = {};
            if(response.data.folders) {
                folders = response.data.folders;
            } else {
                errors.push("Unable to load folders");
            }

            this.setState({
                ...this.state,
                errors: errors,
                current_folder: folders,
                child_folders: folders.child_folders,
                files: folders.files,
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
                current_folder: null,
                child_folders: [],
                files: [],
            });
        });
    };

    success = () => {
        return (
            <React.Fragment>
                <div className="flex flex-col justify-center py-4 sm:px-6 lg:px-8">
                    <div className="md:w-full lg:w-1/2mx-auto text-center">
                        <div className="flex items-center justify-center">
                            <div className="flex-shrink-0 h-12 w-12 mr-6">
                                <FontAwesomeIcon icon={"folder"} className="fa-4x text-blue-400 pr-3" />
                            </div>
                            <div className="ml-4">
                                <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-400">
                                    Sub Folders
                                </h2>
                            </div>
                        </div>
                    </div>

                    <ListFolders folders={this.state.child_folders} />
                </div>
                <div className="flex flex-col justify-center py-4 sm:px-6 lg:px-8">
                    <div className="md:w-full lg:w-1/2mx-auto text-center">
                        <div className="flex items-center justify-center">
                            <div className="flex-shrink-0 h-12 w-12 mr-6">
                                <FontAwesomeIcon icon={"file"} className="fa-4x text-blue-400 pr-3" />
                            </div>
                            <div className="ml-4">
                                <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-400">
                                    Files
                                </h2>
                            </div>
                        </div>
                    </div>

                    <ListFolders folders={this.state.files} />
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

        if(this.state.current_folder != null) {
            return this.success();
        }

        if(this.state.errors && this.state.errors.length > 0) {
            return this.failed();
        }

        return (
            <React.Fragment>
                <div className="flex flex-col justify-center py-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-center">
                        <div className="flex-shrink-0 h-12 w-12 mr-6">
                            <FontAwesomeIcon icon={"spinner"} className="fa-4x fa-spin text-blue-400 pr-3" />
                        </div>
                        <div className="ml-4">
                            <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-400">
                                Loading...
                            </h2>
                        </div>
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

export default withRouter(RootFolders);
