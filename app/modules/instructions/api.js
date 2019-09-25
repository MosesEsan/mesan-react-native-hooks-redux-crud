import axios from 'axios';

import * as c from './constants';

export function getInstructions() {
    return new Promise((resolve, reject) => {

        let url = `${c.API_URL}${c.INSTRUCTIONS}`;
        axios.get(url)
            .then((res) => resolve(res))
            .catch(error => reject(error.message))
    });
}