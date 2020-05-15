import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from 'axios';
import renderHTML from 'react-render-html';
import * as api from "./../constants/api.js";

class DynamicForm extends Component {

    state = {
        request_details: {
            request_uri: api.BASE_DOMAIN+'/v1/oauth/token',
            request_method: 'POST',
            request_headers: {
                headers: { Authorization: "Bearer " + this.props.token }
            },
            request_button: {
                text: "Sign In",
                class: "btn-primary"
            }
        },
        fields: {
            email: {
                id: 'name',
                name: 'name',
                type: 'text',
                label: 'Name',
                placeholder: 'Enter your Name',
                rules: {
                    required: true,
                    min: 0,
                    max: null,
                    regex: null,
                }
            },
            password: {
                id: 'secret',
                name: 'secret',
                type: 'secret',
                label: 'Secret Phrase',
                placeholder: null,
                rules: {
                    required: true,
                    min: 0,
                    max: null,
                    regex: null,
                }
            }
        },
        errors: {
            general: [],
            request: [],
            fields: {}
        },
    };

    static GRANT_TYPE = 'password';
    static CLIENT_ID = '2';
    static CLIENT_SECRET = 'k2useT2XqbCWwLOdSg1kngBFdXao7ukrWY05ot20';

    componentDidMount() {
        let request = this.state.request_details;
        let fields = this.state.fields;

        if(typeof this.props.request === "function") {
            request = this.props.request();
        }
        if(typeof this.props.fields === "function") {
            fields = this.props.fields();
        }

        this.setState({
            request_details: request,
            fields: fields,
            errors: {},
        })
    }

    displayGeneralErrors = () => {
        let errors = [];
        if(this.state.errors.general && this.state.errors.general.length > 0) {
            this.state.errors.general.map((error, i) => {
                errors.push(error);
                return error;
            });
        }
        if(this.state.errors.request && this.state.errors.request.length > 0) {
            this.state.errors.request.map((error, i) => {
                errors.push(error);
                return error;
            });
        }

        if(!errors.length > 0) {
            return null;
        }
        return (
            <div className="bg-red-300 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-12 -mt-2" role="alert">
                <strong className="font-bold">
                    <FontAwesomeIcon icon="exclamation-circle" className="text-red-700 mr-2" />
                    Whoops!
                </strong>
                <ul>
                    {errors.map((error, i) => {
                        return (<li className="pt-2" key={i}>
                            <div className="flex items-center text-sm leading-5 text-red-800">
                                {error}
                            </div>
                        </li>)
                    })}
                </ul>
            </div>
        );
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        // Reset any errors in the form before submitting.
        this.setState({
            ...this.state,
            errors: {
                general: [],
                request: [],
                fields: {}
            },
        });

        const data = new FormData(event.target);

        data.set('grant_type', DynamicForm.GRANT_TYPE);
        data.set('client_id', DynamicForm.CLIENT_ID);
        data.set('client_secret', DynamicForm.CLIENT_SECRET);

        let tmpErrors = {};

        Object.keys(this.state.fields).map((key, number) => {
            // Name of the field for validation purposes
            const fieldName = this.state.fields[key].name;

            const fieldLabel = this.state.fields[key].label.toLowerCase();

            // Handle min length validation
            if(this.state.fields[key].rules.min && data.get(fieldName).length < this.state.fields[key].rules.min) {
                if(this.state.fields[key].rules.required || data.get(fieldName).length > 0) {
                    tmpErrors[fieldName] = ["The "+fieldLabel+" field must be at least "+this.state.fields[key].rules.min+" characters."];
                }
            }
            // Handle max length validation
            if(this.state.fields[key].rules.max && data.get(fieldName).length > this.state.fields[key].rules.max) {
                if(this.state.fields[key].rules.required || data.get(fieldName).length > 0) {
                    tmpErrors[fieldName] = ["The "+fieldLabel+" field must be at most "+this.state.fields[key].rules.max+" characters."];
                }
            }

            // Handle required validation
            if(this.state.fields[key].rules.required && (!data.get(fieldName) || data.get(fieldName).length === 0)) {
                tmpErrors[fieldName] = ["The "+fieldLabel+" field is required."];
            }

            return true;
        });

        if(Object.keys(tmpErrors).length > 0) {
            // If any client side errors are detected. Set them in the state and abort.
            this.setState({
                ...this.state,
                errors: {
                    ...this.state.errors,
                    fields: tmpErrors,
                },
            });

            return;
        }

        await axios.post(this.state.request_details.request_uri, data, this.state.request_details.request_headers)
            .then(response => {
                if(response.data.errors && response.data.errors.length > 0) {
                    const errors = {
                        ...this.state.errors,
                        fields: response.data.errors,
                    };

                    this.setState({
                        ...this.state,
                        errors: errors,
                    });

                    return;
                }

                if(typeof this.props.callback === "function") {
                    this.props.callback(response);
                } else {
                    alert('Form submitted!');
                }
            })
            .catch(error => {
                let generalErrors =[
                        "There was an error submitting the form."
                    ];
                let fieldErrors = {};
                let requestErrors = [];


                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx

                    // If the server responded with some validation errors.
                    if(error.response.data.errors) {
                        fieldErrors = error.response.data.errors
                    } else if(error.response.data.message) {
                        requestErrors = [
                            error.response.data.message
                        ];
                    } else {
                        // Otherwise take the status code and text from the response
                        if(error.response && error.response.status && error.response.statusText) {
                            let extraInfo = '';
                            if(typeof error.response.data === 'string') {
                                extraInfo += "("+error.response.data+")";
                            }
                            requestErrors = [
                                error.response.status + ": " + error.response.statusText + " " + extraInfo
                            ];
                        }
                    }
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    requestErrors = [
                        "Unable to contact the server: (" + error.message +")"
                    ];
                } else {
                    // Something happened in setting up the request that triggered an Error
                    // The `error.message` may contain more information.
                    requestErrors = [
                        "Unable to contact the server: (" + error.message +")"
                    ];
                }

                const errors = {
                    general: generalErrors,
                    fields: fieldErrors,
                    request: requestErrors,
                };

                this.setState({
                    ...this.state,
                    errors: errors,
                });
            });
    };

    hiddenInput = field => {

        let input = '<input id="'+field.id+'" name="'+field.name+'" type="'+field.type+'" value="'+field.value+'"/>';

        return (
            <React.Fragment key={field.id}>
                {renderHTML(input)}
            </React.Fragment>
        );
    };

    textInput = field => {
        let classNamesForInput = "border-gray-600 w-full bg-gray-800 text-sm text-gray-400 transition border focus:outline-none focus:border-gray-600 rounded p-2 leading-normal";

        let errorMessage = '';

        if(this.hasError(field.name)) {
            classNamesForInput = "border-red-600 " + classNamesForInput;
            errorMessage = (
                <span className="invalid-feedback text-red-600" role="alert">
                    <strong>{this.getError(field.name)}</strong>
                </span>
            );
        }

        let input = '<input id="'+field.id+'" name="'+field.name+'" type="'+field.type+'" autoComplete="'+field.id+'" className="'+classNamesForInput+'"';
        if(field.rules.required) {
            input += ' required';
        }
        if(field.rules.min > 0) {
            input += ' min="'+field.rules.min+'"';
        }
        if(field.rules.max > 0) {
            input += ' max="'+field.rules.max+'"';
        }
        if(field.rules.pattern != null) {
            input += ' pattern="'+field.rules.regex+'"';
        }
        if(field.placeholder != null) {
            input += ' placeholder="'+field.placeholder+'"';
        }
        input += " />";

        let passwordFieldExtras = '';
        if(this.props.loginForm && this.props.loginForm === true && field.id === 'password') {
            passwordFieldExtras = this.passwordSpecificFields();
        }

        return (
            <div key={field.id} className="mt-6">
                <label htmlFor={field.name}
                       className="block text-sm font-medium leading-5 text-gray-400">
                    {field.label}
                </label>
                <div className="mt-1 rounded-md shadow-sm">
                    {renderHTML(input)}
                    {errorMessage}
                </div>
                {passwordFieldExtras}
            </div>
        );
    };

    hasError = fieldName => {
        if(this.state.errors) {
            if(this.state.errors.fields && this.state.errors.fields[fieldName]) {
                return true;
            }
        }
        return false;
    };

    getError = fieldName => {
        if(this.state.errors) {
            if(this.state.errors.fields[fieldName]) {
                return this.state.errors.fields[fieldName];
            }
        }

        return null;
    };

    renderField = field => {
        const suportedFields = ["text", "password", "email", "hidden"];

        if(!suportedFields.includes(field.type)) {
            return 'Unsupported field type';
        }

        if(field.type === "hidden") {
            return this.hiddenInput(field);
        }

        return this.textInput(field);

    };

    submitButton = () => {
        let buttonClass = 'btn-default';

        if(this.state.request_details.request_button) {
            buttonClass = this.state.request_details.request_button.class;
        }

        let buttonText = 'Submit';
        if(this.state.request_details.request_button) {
            buttonText = this.state.request_details.request_button.text;
        }
        return (
            <div className="mt-6">
                <span className="block w-full rounded-md shadow-sm">
                    <button type="submit" className={"w-full flex justify-center btn " + buttonClass}>
                      {renderHTML(buttonText)}
                    </button>
                </span>
            </div>
        )
    };

    passwordSpecificFields = () => {
        return (
            <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center">
                    <input id="remember_me" name="remember_me" type="checkbox"
                           className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"/>
                    <label htmlFor="remember_me"
                           className="ml-2 block text-sm leading-5 text-gray-600 cursor-pointer">
                        Remember me
                    </label>
                </div>
                <div className="text-sm leading-5">
                    <Link to="/password/request"
                          className="font-medium text-indigo-600 hover:text-indigo-400 focus:outline-none focus:underline transition ease-in-out duration-150">
                        Forgot your password?
                    </Link>
                </div>
            </div>
        );
    };

    render() {
        return (
            <React.Fragment>
                {this.displayGeneralErrors()}
                <form className="-mt-6"
                      action={this.state.request_details.uri}
                      method={this.state.request_details.request_method}
                      onSubmit={this.handleSubmit}>
                    {Object.keys(this.state.fields).map((item, i) => {
                        return this.renderField(this.state.fields[item]);
                    })}

                    {this.submitButton()}
                </form>
            </React.Fragment>
        );
    };



}

export default DynamicForm;
