import React, { Component } from 'react';
import User from './User';
import moment from 'moment';
// set locale to finnish
moment.locale('fi');

class App extends Component {
    render() {
        return (
            <div className="content">
                <User />
            </div>
        );
    }
}

export default App;
