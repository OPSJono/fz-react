import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout.jsx';

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

    setCurrentUser = (response) => {
        this.setState({
            auth: {
                authenticated: response.access_token.length > 0,
                access_token: response.access_token,
                refresh_token: response.refresh_token,
            }
        })
    }

    render() {
        return (
            <BrowserRouter>
                <Layout auth={this.state.auth} setCurrentUser={this.setCurrentUser}/>
            </BrowserRouter>
        );
    };
}

export default App;
