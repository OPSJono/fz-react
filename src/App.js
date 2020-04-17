import React, { Component } from 'react';
import Navigation from './components/Navigation.jsx';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import * as RegIcons from '@fortawesome/free-regular-svg-icons';
import * as SolidIcons from '@fortawesome/free-solid-svg-icons';

const solidIconList = Object
    .keys(SolidIcons)
    .filter(key => key !== "fas" && key !== "prefix" )
    .map(icon => SolidIcons[icon]);

library.add(...solidIconList);

const RegIconList = Object
    .keys(RegIcons)
    .filter(key => key !== "fas" && key !== "prefix" )
    .map(icon => RegIcons[icon]);

library.add(...RegIconList);

library.add(fab);

class App extends Component {

    state = {
        auth: {
            authenticated: false,
            access_token: '',
            refresh_token: '',
        },
    };

    render() {
        return (
            <div className="App" >
                <Navigation
                    auth={this.state.auth}
                />
                <div className="container w-full mx-auto pt-20 min-h-screen">
                    <div className="w-full px-4 md:px-0 md:mt-8 mb-16 text-gray-800 leading-normal">
                        <div className="flex flex-wrap">
                            <div className="w-full p-3">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

export default App;
