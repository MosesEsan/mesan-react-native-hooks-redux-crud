import * as c from './constants';

let dataState = { quotes: [] };

const dataReducer = (state = dataState, action) => {
    switch (action.type) {
        case c.ADD_QUOTE:
            let { quote } = action.data;

            //clone the current state
            let clone = JSON.parse(JSON.stringify(state.quotes));

            clone.unshift(quote); //add the new quote to the top

            return {...state, quotes: clone};

        case c.QUOTES_AVAILABLE:
            let { quotes } = action.data;

            return {...state, quotes};

        case c.UPDATE_QUOTE:{
            let { quote } = action.data;

            //clone the current state
            let clone = JSON.parse(JSON.stringify(state.quotes));

            //check if bookmark already exist
            const index = clone.findIndex((obj) => obj.id === quote.id);

            //if the quote is in the array, remove the bookmark
            if (index !== -1) clone[index] = quote;

            return {...state, quotes: clone};
        }

        case c.DELETE_QUOTE:{
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

export default dataReducer;