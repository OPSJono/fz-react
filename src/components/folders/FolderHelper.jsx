import * as api from "./../../constants/api.js";
import axios from "axios";

class FolderHelper {

    token;

    constructor(token) {
        this.token = token;
    }

    async load(folder_id) {
        let url = api.BASE_DOMAIN+'/v1/folders/'+folder_id+'/view';

        return axios.get(url, {
            headers: { Authorization: "Bearer " + this.token }
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

            return {
                errors: errors,
                current_folder: folders,
                child_folders: folders.child_folders,
                files: folders.files,
            };
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

            return {
                errors: errors,
                current_folder: null,
                child_folders: [],
                files: [],
            };
        });
    };
}

export default FolderHelper;
