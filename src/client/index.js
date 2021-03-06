import React from 'react';
import { render } from 'react-dom';
import configureStore from 'store/configureStore';
import App from 'components/App.jsx';
import { Provider } from 'react-redux';

import 'scss/application.scss';

const store = configureStore();

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'),
);
