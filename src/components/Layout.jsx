import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";

import Navigation from "./Navigation";

import Login from "./auth/Login";
import Logout from "./auth/Logout";
import Register from "./auth/Register";
import PasswordRequest from "./auth/PasswordRequest";
import PasswordReset from "./auth/PasswordReset";
import RootFolders from "./folders/RootFolders";
import ViewFolder from "./folders/ViewFolder";
import EditFolder from "./folders/EditFolder";
import DeleteFolder from "./folders/DeleteFolder";

class Layout extends Component {

    isAuthenticated = () => {
        return this.props.auth.authenticated === true;
    };

    render() {
        return (
            <React.Fragment>
                <div className="App" >
                    <Navigation
                        auth={this.props.auth}
                        isAuthenticated={this.isAuthenticated}
                    />
                    <div className="container w-full mx-auto pt-20 min-h-screen">
                        <div className="w-full px-4 md:px-0 md:mt-8 mb-16 text-gray-800 leading-normal">
                            <div className="flex flex-wrap">
                                <div className="w-full p-3">
                                    <div>
                                        {/*
                                      A <Switch> looks through all its children <Route>
                                      elements and renders the first one whose path
                                      matches the current URL. Use a <Switch> any time
                                      you have multiple routes, but you want only one
                                      of them to render at a time
                                    */}
                                        <Switch>
                                            <Route exact path="/">
                                                {this.landingPage()}
                                            </Route>

                                            <Route exact path="/folders">
                                                <RootFolders token={this.props.auth.access_token} isAuthenticated={this.isAuthenticated} />
                                            </Route>

                                            <Route path="/folders/:id/view">
                                                <ViewFolder token={this.props.auth.access_token} isAuthenticated={this.isAuthenticated} />
                                            </Route>

                                            <Route path="/folders/:id/edit">
                                                <EditFolder token={this.props.auth.access_token} isAuthenticated={this.isAuthenticated} />
                                            </Route>

                                            <Route path="/folders/:id/delete">
                                                <DeleteFolder token={this.props.auth.access_token} isAuthenticated={this.isAuthenticated} />
                                            </Route>

                                            <Route path="/login">
                                                <Login setCurrentUser={this.props.setCurrentUser} isAuthenticated={this.isAuthenticated} />
                                            </Route>
                                            <Route path="/register">
                                                <Register isAuthenticated={this.isAuthenticated} />
                                            </Route>
                                            <Route path="/logout">
                                                <Logout token={this.props.auth.access_token} removeCurrentUser={this.props.removeCurrentUser} />
                                            </Route>
                                            <Route path="/password/request">
                                                <PasswordRequest isAuthenticated={this.isAuthenticated} />
                                            </Route>
                                            <Route path="/password/reset">
                                                <PasswordReset isAuthenticated={this.isAuthenticated} />
                                            </Route>
                                        </Switch>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    };

    landingPage = () => {
        return (
            <React.Fragment>
                <span className={"text-gray-400"}>Welcome to the filezone application. Please login.</span>
            </React.Fragment>
        );
    }



}

export default Layout;
