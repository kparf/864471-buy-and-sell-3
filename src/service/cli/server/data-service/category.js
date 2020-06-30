'use strict';

class CategoryService {
  constructor(offers) {
    this._data = offers;
  }

  findAll() {
    const categories = this._data.reduce((acc, offer) => {
      acc.add(...offer.category);
      return acc;
    }, new Set());

    return [...categories];
  }
}

module.exports = CategoryService;