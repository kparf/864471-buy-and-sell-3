'use strict';

const titleStartWith = (text) => (offer) => offer.title && offer.title.includes(text);

class SearchService {
  constructor(offers) {
    this._data = offers;
  }

  search(query) {
    const articles = this._data.filter(titleStartWith(query));
    return articles;
  }
}

module.exports = SearchService;
