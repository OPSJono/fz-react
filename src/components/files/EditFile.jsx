import React, { Component } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as api from "./../../constants/api.js";
import {Link, Redirect, withRouter} from "react-router-dom";
import DynamicForm from "../DynamicForm";
import FileHelper from "./FileHelper";

class EditFile extends Component {

    constructor(props) {
        super(props);
        let id = props.match.params.id;

        this.state = {
            errors: [],
            file_id: id,
            current_file: null,
        };
    }

    componentDidMount() {
        this.loadData(this.state.file_id).then(r => {});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // If the current url is different to the previous, re-fetch the contents
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.loadData(this.props.match.params.id).then(r => {});
        }
    }

    formRequest = () => {
        let url = api.BASE_DOMAIN+'/v1/files/'+this.state.current_file.id+'/update';

        return {
            request_uri: url,
            request_method: 'POST',
            request_headers: {
                headers: { Authorization: "Bearer " + this.props.token }
            },
            request_button: {
                text: "Save",
                class: "btn-primary"
            }
        };
    };

    formFields = () => {
        return {
            name: {
                id: 'name',
                name: 'name',
                type: 'text',
                label: 'Name',
                placeholder: 'File name',
                value: this.state.current_file.name,
                rules: {
                    required: true,
                    min: 0,
                    max: null,
                    regex: null,
                }
            },
            description: {
                id: 'description',
                name: 'description',
                type: 'text',
                label: 'Description',
                placeholder: 'Description of the file.',
                value: this.state.current_file.description,
                rules: {
                    required: true,
                    min: 0,
                    max: null,
                    regex: null,
                }
            },
        };
    };

    loadData = async (file_id) => {
        let helper = new FileHelper(this.props.token);

        let values = await helper.load(file_id);

        this.setState({
            ...this.state,
            ...values
        });
    };

    saved = (response) => {
        // Handle a plain object or an axios response object
        if(response.data) {
            response = response.data;
        }

        this.setState({
            ...this.state,
            current_file: response.data.file
        });
    };

    success = () => {
        return (
            <React.Fragment>
                <div className="flex flex-col justify-center py-4 sm:px-6 lg:px-8">

                    <div className="md:w-full lg:w-1/3 mx-auto text-center">
                        <div className="flex items-center justify-center">
                            <div className="flex-shrink-0 h-12 w-12 mr-6">
                                <FontAwesomeIcon icon={"folder"} className="fa-4x text-blue-400 pr-3" />
                            </div>
                            <div className="ml-4">
                                <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-400">
                                    Edit File
                                </h2>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 md:w-full lg:w-1/3 mx-auto">
                        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
                            <DynamicForm request={this.formRequest} fields={this.formFields} callback={this.saved} />
                            <div className="mt-2 block w-full rounded-md shadow-sm">
                                <Link to={"/files/"+this.state.current_file.id+"/view"} className="w-full flex justify-center btn btn-default">
                                    Cancel
                                </Link>
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
                                    There has been an error trying to load the file. <br />
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

        if(this.state.current_file != null) {
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
                                Edit File
                            </h2>
                        </div>
                    </div>

                    <div className="mt-8 md:w-full lg:w-1/3 mx-auto">
                        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
                            <div className="pb-4 text-center text-gray-400">
                                <i>Loading file...</i>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    };



}

export default withRouter(EditFile);
