// Description: Redux Store Configuration

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from './rootReducer'; //Import the root reducer

const enhancer = compose(applyMiddleware(thunk));

export default createStore(reducers, enhancer);