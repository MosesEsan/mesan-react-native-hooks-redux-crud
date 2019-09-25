// Description: Root Reducer

import { combineReducers } from 'redux';

import { reducer as dataReducer } from "../modules/instructions/" //The instructions module reducer, name might differ depending on what ypu named your module
import { reducer as quotesReducer } from "../modules/quotes/"

// Combine all the reducers
const rootReducer = combineReducers({ dataReducer, quotesReducer });

export default rootReducer;