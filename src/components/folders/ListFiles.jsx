import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class ListFiles extends Component {


    isValidString = (o) => {
        if (o === null) {
            return false;
        }
        if (
            typeof o == "string" ||
            (typeof o == "object" && o.constructor === String)
        ) {
            return o.length > 0;
        } else {
            return false;
        }
    };

    extensionIcon = (ext) => {
        let iconName = "file";

        const fontAwesomeIconClasses = {
            // Images
            "png": "file-image",
            "jpg": "file-image",
            "jpeg": "file-image",
            "gif": "file-image",
            // Videos
            "mp3": "file-audio",
            "mpg": "file-video",
            "mpeg": "file-video",
            "mp4": "file-video",
            // Documents
            "pdf": "file-pdf",
            "pages": "file-word",
            "doc": "file-word",
            "docx": "file-word",
            "odt": "file-word",
            "xls": "file-excel",
            "numbers": "file-excel",
            "xlsx": "file-excel",
            "ods": "file-excel",
            "ppt": "file-powerpoint",
            "pptx": "file-powerpoint",
            "key": "file-powerpoint",
            "odp": "file-powerpoint",
            "txt": "file-text",
            "htm": "file-code",
            "html": "file-code",
            "json": "file-code",
            // Archives
            "gzip": "file-archive",
            "zip": "file-archive"
        };

        const result = fontAwesomeIconClasses[ext];

        if (this.isValidString(result)) {
            iconName = result;
        }

        return (
            <FontAwesomeIcon icon={iconName} className="fa-2x text-blue-400 p-0" />
        );
    };

    render = () => {
        return (
            <React.Fragment>
                <div className="mt-8 md:w-full lg:w-2/3 mx-auto">
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
                                {this.props.files.map((file, index) => (
                                    <tr key={file.id}>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 leading-5 text-gray-200">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-8 w-8">
                                                    {this.extensionIcon(file.extension)}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm leading-5 font-medium text-gray-200">
                                                        {file.name}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 border-b border-gray-200 text-sm leading-5 text-gray-200">
                                            {file.description}
                                        </td>
                                        <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                                            <Link to={"/files/"+file.id+"/view"} className="text-indigo-300 hover:text-indigo-500" >View</Link>
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

export default ListFiles;
