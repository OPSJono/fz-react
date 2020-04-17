import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Navigation extends Component {

    authItems = () => {
        return (
            <div
                className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block mt-2 lg:mt-0 bg-gray-800 z-20"
                id="nav-content">
                <ul className="list-reset lg:flex flex-1 items-center px-4 md:px-0">
                    <li className="mr-6 my-2 md:my-0">
                        <a href="/"
                           className="block py-1 md:py-3 pl-1 align-middle active-here border-b-2 text-blue-400 border-blue-400 not-active-here text-gray-400 no-underline hover:text-gray-100 hover:border-blue-400">
                            <FontAwesomeIcon icon="check-square" />
                            <span className="pb-1 md:pb-0 text-sm">Home</span>
                        </a>
                    </li>
                    <li className="mr-6 my-2 md:my-0">
                        <a href="/users"
                           className="block py-1 md:py-3 pl-1 align-middle active-here 'border-b-2 text-blue-400 border-pink-400 not-active-here text-gray-400 no-underline hover:text-gray-100 hover:border-pink-400">
                            <i className="fas fa-tasks fa-fw mr-3"/>
                            <span className="pb-1 md:pb-0 text-sm">Users</span>
                        </a>
                    </li>
                    <li className="mr-6 my-2 md:my-0">
                        <a href="/orders"
                           className="block py-1 md:py-3 pl-1 align-middle active-here  'border-b-2 text-blue-400 border-purple-400 not-active-here text-gray-400 no-underline hover:text-gray-100 hover:border-purple-400">
                            <i className="fa fa-envelope fa-fw mr-3"/>
                            <span className="pb-1 md:pb-0 text-sm">Orders</span>
                        </a>
                    </li>
                    <li className="mr-6 my-2 md:my-0">
                        <a href="/machines"
                           className="block py-1 md:py-3 pl-1 align-middle active-here  ? 'border-b-2 text-blue-400 border-green-400 not-active-here text-gray-400 no-underline hover:text-gray-100 hover:border-green-400">
                            <i className="fas fa-chart-area fa-fw mr-3"/>
                            <span className="pb-1 md:pb-0 text-sm">Machines</span>
                        </a>
                    </li>
                    <li className="mr-6 my-2 md:my-0">
                        <a href="/logs"
                           className="block py-1 md:py-3 pl-1 align-middle active-here border-b-2 text-blue-400 border-red-400 not-active-here text-gray-400 no-underline hover:text-gray-100 hover:border-red-400">
                            <i className="fa fa-wallet fa-fw mr-3"/>
                            <span className="pb-1 md:pb-0 text-sm">Logs</span>
                        </a>
                    </li>
                </ul>

                <div className="relative pull-right pl-4 pr-4 md:pr-0" style="z-index: 100000;">
                    <input type="search" placeholder="Search"
                           className="w-full bg-gray-900 text-sm text-gray-400 transition border border-gray-800 focus:outline-none focus:border-gray-600 rounded py-1 px-2 pl-10 appearance-none leading-normal">
                        <div className="absolute search-icon" style="top: 0.375rem;left: 1.75rem;">
                            <svg className="fill-current pointer-events-none text-gray-500 w-4 h-4"
                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/>
                            </svg>
                        </div>
                    </input>
                </div>

            </div>
        );
    };

    guestItems = () => {
        return (
            <div
                className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block mt-2 lg:mt-0 bg-gray-800 z-20"
                id="nav-content">
                <ul className="list-reset lg:flex flex-1 items-center px-4 md:px-0">
                    <li className="mr-6 my-2 md:my-0">
                        <a href="/login"
                           className="block py-1 md:py-2 pl-1 align-middle active-here border-b-2 text-blue-400 border-blue-400 not-active-here text-gray-400 no-underline hover:text-gray-100 hover:border-blue-400">
                            <FontAwesomeIcon icon="unlock" className="mr-3 text-blue-400" />
                            <span className="pb-1 md:pb-0 text-sm">Login</span>
                        </a>
                    </li>
                </ul>
            </div>
        );
    };

    menuItems = () => {
        if(this.props.auth.authenticated === true) {
            return this.authItems();
        } else {
            return this.guestItems();
        }
    };

    render() {
        return (
            <React.Fragment>
                <nav id="navbar" className="bg-gray-800 fixed w-full z-10 top-0 shadow">
                    <div className="w-full container mx-auto flex flex-wrap items-center mt-0 pt-3 pb-3 md:pb-0">

                        <div className="w-1/2 pl-2 md:pl-0">
                            <a className="text-gray-100 text-base xl:text-xl no-underline hover:no-underline font-bold"
                               href="/">
                                <i className="fas fa-moon text-blue-400 pr-3"/>
                            </a>
                        </div>

                        <div className="w-1/2 pr-0">
                            <div className="flex relative inline-block float-right">
                                <div className="block lg:hidden pr-4">
                                    <button id="nav-toggle"
                                            className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-100 hover:border-teal-500 appearance-none focus:outline-none">
                                        <svg className="fill-current h-3 w-3" viewBox="0 0 20 20"
                                             xmlns="http://www.w3.org/2000/svg"><title>Menu</title>
                                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>

                        </div>

                        { this.menuItems() }

                    </div>
                </nav>
            </React.Fragment>
        );
    };



}

export default Navigation;
