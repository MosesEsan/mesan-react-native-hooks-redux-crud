import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from './app/redux/store'; //Import the store
import Router from './app/index' //Import the component file

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router/>
            </Provider>
        );
    }
}