import React, { Component } from 'react';
import User from './User';
import moment from 'moment';
import { PageHeader } from 'react-bootstrap';

// set locale to finnish
moment.locale('fi');

import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
    render() {
        return (
            <div className="content">
                <PageHeader>Puppy Chart</PageHeader>
                <User />
            </div>
        );
    }
}

export default App;
