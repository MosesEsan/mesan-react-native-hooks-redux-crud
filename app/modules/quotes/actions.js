import * as c from './constants';

// Get Quotes
export const addQuotes = (quotes) => ({
    type: c.QUOTES_AVAILABLE,
    data: {quotes}
});

// Add Quote - CREATE (C)
export const addQuote = (quote) => ({
    type: c.ADD_QUOTE,
    data: {quote}
});

// Update Quote - UPDATE (U)
export const updateQuote = (quote) => ({
    type: c.UPDATE_QUOTE,
    data: {quote}
});

// Delete Quote - DELETE (D)
export const deleteQuote = (id) => ({
    type: c.DELETE_QUOTE,
    data: {id}
});