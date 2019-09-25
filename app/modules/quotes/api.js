import {AsyncStorage} from 'react-native';
import axios from 'axios';

import * as c from './constants';

export function getQuotes() {
    return new Promise((resolve, reject) => {

        //OPTION 1 - LOCAL DATA
        AsyncStorage.getItem(c.key, (err, quotes) => {
            console.log(quotes)
            if (err) reject(err.message);
            else if (quotes) {
                console.log(JSON.parse(quotes))
                resolve(JSON.parse(quotes))
            }
            else resolve([]);
        });

        //OPTION 2 - FAKE API
        //let url = `${c.API_URL}${c.QUOTES}`;
        //axios.get(url)
        //    .then((res) => resolve(res))
        //    .catch(error => reject(error.message))
    });
}

export function addQuote(quote) {
    return new Promise((resolve, reject) => {

        //OPTION 1 - ADD TO LOCAL STORAGE DATA
        AsyncStorage.getItem(c.key, (err, quotes) => {
            if (err) alert(err.message);
            else if (quotes !== null){
                quotes = JSON.parse(quotes);

                //add the new quote to the top
                quotes.unshift(quote);

                //Update the local storage
                AsyncStorage.setItem(c.key, JSON.stringify(quotes), () => resolve(quote));
            }
        });

        //OPTION 2 - FAKE API
        //let url = `${c.API_URL}${c.QUOTES}`;
        // axios.post(url, quote)
        //     .then(res => res.data)
        //     .then((data) => resolve(data))
        //    .catch(error => reject(error.message))

    });
}

export function updateQuote(quote) {
    return new Promise((resolve, reject) => {

        //OPTION 1 - ADD TO LOCAL STORAGE DATA
        AsyncStorage.getItem(c.key, (err, quotes) => {
            if (err) alert(err.message);
            else if (quotes !== null){
                quotes = JSON.parse(quotes);

                //find the index of the quote with the quote id
                const index = quotes.findIndex((obj) => obj.id === quote.id);

                //if the quote is in the array, replace the quote
                if (index !== -1) quotes[index] = quote;

                //Update the local storage
                AsyncStorage.setItem(c.key, JSON.stringify(quotes), () => resolve(quote));
            }
        });

        //OPTION 2 - FAKE API
        //let url = `${c.API_URL}${c.QUOTES}`;
        // axios.post(url, quote)
        //     .then(res => res.data)
        //     .then((data) => resolve(data))
        //    .catch(error => reject(error.message))

    });
}

export function deleteQuote(id) {
    return new Promise((resolve, reject) => {

        //OPTION 1 - UPDATE LOCAL STORAGE DATA
        AsyncStorage.getItem(c.key, (err, quotes) => {
            if (err) reject(err.message);
            else if (quotes !== null){
                quotes = JSON.parse(quotes);

                //find the index of the quote with the id passed
                const index = quotes.findIndex((obj) => obj.id === id);

                // remove the quote
                if (index !== -1) quotes.splice(index, 1);

                //Update the local storage
                AsyncStorage.setItem(c.key, JSON.stringify(quotes), () => resolve(id));
            }
        });

        //OPTION 2 - FAKE API
        //let url = `${c.API_URL}${c.QUOTES}`;
        // axios.delete(url, {data:{id:id}})
        //     .then((res) => resolve(res))
        //     .catch(error => reject(error.message))
    });
}