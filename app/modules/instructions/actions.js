import * as c from './constants';

export const addData = (data) => ({
    type: c.DATA_AVAILABLE,
    data
});