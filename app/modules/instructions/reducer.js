import * as c from './constants';

let dataState = { data: [] };

const dataReducer = (state = dataState, action) => {
    switch (action.type) {
        case c.DATA_AVAILABLE:
            return {...state, data: action.data};
        default:
            return state;
    }
};

export default dataReducer;