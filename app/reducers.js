import { combineReducers } from 'redux';

import { QUOTES_AVAILABLE, ADD_QUOTE, UPDATE_QUOTE, DELETE_QUOTE } from "./actions" //Import the actions types constant we defined in our actions

let dataState = { quotes: [] };

const dataReducer = (state = dataState, action) => {
    switch (action.type) {
        case ADD_QUOTE:
            let { quote } = action.data;

            //clone the current state
            let clone = JSON.parse(JSON.stringify(state.quotes));

            clone.unshift(quote); //add the new quote to the top

            return {...state, quotes: clone};

        case QUOTES_AVAILABLE:
            let { quotes } = action.data;

            return {...state, quotes};

        case UPDATE_QUOTE:{
            let { quote } = action.data;

            //clone the current state
            let clone = JSON.parse(JSON.stringify(state.quotes));

            //check if bookmark already exist
            const index = clone.findIndex((obj) => obj.id === quote.id);

            //if the quote is in the array, update the quote
            if (index !== -1) clone[index] = quote;

            return {...state, quotes: clone};
        }

        case DELETE_QUOTE:{
            let { id } = action.data;

            //clone the current state
            let clone = JSON.parse(JSON.stringify(state.quotes));

            //check if quote already exist
            const index = clone.findIndex((obj) => obj.id === id);

            //if the quote is in the array, remove the quote
            if (index !== -1) clone.splice(index, 1);

            return {...state, quotes: clone};
        }

        default:
            return state;
    }
};

// Combine all the reducers
const rootReducer = combineReducers({dataReducer});

export default rootReducer;
