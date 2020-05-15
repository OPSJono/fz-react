import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class ListFolders extends Component {

    render = () => {
        return (
            <React.Fragment>
                <div className="mt-8 md:w-full lg:w-2/3  mx-auto">
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
                                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-bold text-gray-500 uppercase tracking-wider">
                                    Sub-Folders
                                </th>
                                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-bold text-gray-500 uppercase tracking-wider">
                                    Files
                                </th>
                                <th className="px-6 py-3 border-b border-gray-200" />
                            </tr>
                            </thead>
                            <tbody className="bg-gray-700">
                                {this.props.folders.map((folder, index) => (
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
                                            <Link to={"/folders/"+folder.id+"/view"} className="text-indigo-300 hover:text-indigo-500" >View</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </React.Fragment>
        );
    };


}

export default withRouter(ListFolders);
