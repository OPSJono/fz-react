import React, { Component } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link, Redirect, withRouter} from "react-router-dom";
import FileHelper from "./FileHelper";

class ViewFile extends Component {

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

    loadData = async (file_id) => {
        let helper = new FileHelper(this.props.token);

        let values = await helper.load(file_id);

        this.setState({
            ...this.state,
            ...values
        });
    };

    success = () => {
        return (
            <React.Fragment>
                <div className="flex flex-col justify-center py-4 sm:px-6 lg:px-8">

                    <div className="mt-0 md:w-full lg:w-2/3 mx-auto">
                        <div className="bg-gray-800 align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg">
                            <table className="min-w-full bg-gray-700">
                                <thead className="bg-gray-800">
                                <tr>
                                    <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-bold text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-bold text-gray-500 uppercase tracking-wider">
                                        Description
                                    </th>
                                    <th className="px-6 py-3 border-b border-gray-200" />
                                </tr>
                                </thead>
                                <tbody className="bg-gray-700">
                                    <tr key={this.state.current_file.id}>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 leading-5 text-gray-200">
                                            {this.state.current_file.name}
                                        </td>
                                        <td className="px-6 py-4 border-b border-gray-200 text-sm leading-5 text-gray-200">
                                            {this.state.current_file.description}
                                        </td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                                            <div className="flex items-center justify-center">
                                                <Link to={"/files/"+this.state.current_file.id+"/download"} className="text-green-300 hover:text-green-500 mx-auto">Download</Link>
                                                <Link to={"/files/"+this.state.current_file.id+"/edit"} className="text-blue-300 hover:text-blue-500 mx-auto">Edit</Link>
                                                <Link to={"/files/"+this.state.current_file.id+"/delete"} className="text-red-300 hover:text-red-500 mx-auto">Delete</Link>
                                            </div>
                                        </td>
                                    </tr>
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

export default withRouter(ViewFile);
