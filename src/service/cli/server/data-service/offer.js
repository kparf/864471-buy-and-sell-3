'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../../../../constants`);


class OfferService {

  constructor(offers) {
    this._data = offers;
  }

  findAll() {
    return this._data;
  }

  findOne(id) {
    return this._data.find((item) => item.id === id);
  }

  create(offer) {
    const item = {
      id: nanoid(MAX_ID_LENGTH),
      comments: [],
      ...offer,
    };

    this._data.push(item);
    return item;
  }

  drop(id) {
    const item = this._data.find((item) => item.id === id);
    if (!item) {
      return null;
    }

    this._data = this._data.filter((item) => item.id !== id);
    return item;
  }

  update(id, offer) {
    const oldOffer = this._data.find((item) => item.id === id);
    if (!oldOffer) {
      return null;
    }
    return Object.assign(oldOffer, offer);
  }
}


module.exports = OfferService;
